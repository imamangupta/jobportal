'use client'
import React, { useEffect, useRef,useState } from 'react';
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
        'userid':params.userId
      }
    });

  

    const json = await response.json();
    if (json) {
      console.log(json.resume[0].data[0]);
    
      setData(json.resume[0].data[0])

      // dispatch(setUser(json.user));
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
            <h1 className="text-4xl font-bold text-gray-900">{data?.personalInfo?.name}</h1>
            <p className="text-lg text-gray-600">Frontend Developer</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email: aman.gupta@example.com</p>
            <p className="text-sm text-gray-500">Phone: +91 9876543210</p>
            <p className="text-sm text-gray-500">Location: Delhi, India</p>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Summary</h2>
          <p className="text-gray-700 mt-2">
            A skilled frontend developer with 3+ years of experience in creating responsive and user-friendly web applications. Proficient in HTML, CSS, JavaScript, React.js, and Tailwind CSS. Passionate about building high-quality, performance-oriented websites.
          </p>
        </div>

        <hr className="my-4 border-gray-300" />

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            <li>HTML, CSS, JavaScript, Tailwind CSS</li>
            <li>React.js, Next.js</li>
            <li>Node.js, Express, MongoDB</li>
            <li>Responsive Web Design, Web Performance Optimization</li>
            <li>Git, GitHub, Version Control</li>
          </ul>
        </div>

        <hr className="my-4 border-gray-300" />

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Work Experience</h2>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Frontend Developer - TypeChamp.com</h3>
            <p className="text-gray-600">June 2023 - Present</p>
            <p className="text-gray-700 mt-2">Developed and maintained a web-based typing practice application using React.js, Tailwind CSS, and Node.js. Implemented real-time data fetching, user authentication, and interactive typing challenges.</p>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Frontend Developer - GamersAdda.io</h3>
            <p className="text-gray-600">January 2022 - May 2023</p>
            <p className="text-gray-700 mt-2">Collaborated with designers and backend developers to create a seamless gaming platform. Worked on implementing responsive designs and optimized web performance using modern web technologies.</p>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Education</h2>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">Bachelor of Technology in Computer Science</h3>
            <p className="text-gray-600">ABC University, 2017 - 2021</p>
            <p className="text-gray-700 mt-2">Graduated with distinction and focused on web development, algorithms, and software engineering.</p>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="text-center text-gray-600 text-sm">
          <p>Find me on LinkedIn: <a href="https://linkedin.com/in/aman-gupta" className="text-blue-500 hover:underline">linkedin.com/in/aman-gupta</a></p>
        </div>
      </div>

    </>
  );
}

export default Page;
