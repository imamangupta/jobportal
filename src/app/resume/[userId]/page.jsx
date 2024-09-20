'use client'
import React, { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useParams } from 'next/navigation'
import { BaseApiUrl } from '@/utils/constanst';
function Page() {
  const resumeRef = useRef();
  const params = useParams()
  console.log(params);

  const handleDownload = () => {
    const element = resumeRef.current;

    // Configure html2pdf options
    const opt = {
      margin: 1,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generate the PDF
    html2pdf().from(element).set(opt).save();
  };

  const [data, setData] = useState([])
  const fetchUser = async () => {
    const response = await fetch(`${BaseApiUrl}/resume`, {
      method: 'GET',
      headers: {
        'userid': params.userId
      }
    });



    const json = await response.json();
    if (json) {
      console.log(json.resume[0].data[0]);

      setData(json.resume[0].data[0])

    }
  }


  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>

      <div className="text-center mt-6 mb-6">
        <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Download as PDF
        </button>
      </div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg mt-6" ref={resumeRef}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 uppercase">{data?.personalInfo?.name}</h1>
            {/* <p className="text-lg text-gray-600">{data?.experience[0]?.position}</p> */}
          </div>
          <div>
            <p className="text-sm text-gray-500">Email:{data?.personalInfo?.email}</p>
            <p className="text-sm text-gray-500">Phone: +91 {data?.personalInfo?.phone}</p>
            <p className="text-sm text-gray-500">Location: {data?.personalInfo?.location}</p>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Summary</h2>
          <p className="text-gray-700 mt-2">
            {data?.summary}
            {/* A skilled frontend developer with 3+ years of experience in creating responsive and user-friendly web applications. Proficient in HTML, CSS, JavaScript, React.js, and Tailwind CSS. Passionate about building high-quality, performance-oriented websites. */}
          </p>
        </div>

        <hr className="my-4 border-gray-300" />

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            
            {data?.skills?.map((skill,index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <hr className="my-4 border-gray-300" />

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Work Experience</h2>
          {data?.experience?.map((exp,index) => (
            <div className="mt-4" key={index}>
              <h3 className="text-xl font-semibold text-gray-800">{exp.position} - {exp.company}</h3>
              <p className="text-gray-600">{exp.duration}</p>
              <p className="text-gray-700 mt-2">{exp.description}</p>
            </div>
          ))}


        </div>

        <hr className="my-4 border-gray-300" />

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Education</h2>

          {data?.education?.map((exp, index) => (
            <div className="mt-4" key={index}>
              <h3 className="text-xl font-semibold text-gray-800">{exp.degree}</h3>
              <p className="text-gray-600">{exp.institution}</p>
              <p className="text-gray-700 mt-2">{exp.year}</p>
            </div>
          ))}

        
        </div>

        <hr className="my-4 border-gray-300" />


      </div>

    </>
  );
}

export default Page;
