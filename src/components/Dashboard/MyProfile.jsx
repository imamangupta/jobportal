import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useEffect, useState } from 'react'
import { BaseApiUrl } from '@/utils/constanst'

const MyProfile = () => {
  const [isEditing, setIsEditing] = useState(false)


  const [profile, setProfile] = useState({
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, Maharashtra',
    about: 'Experienced software developer with a passion for creating innovative solutions.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    experience: [
      {
        company: 'TechCorp India',
        position: 'Senior Software Engineer',
        duration: 'Jan 2018 - Present',
      },
      {
        company: 'InnoSoft Solutions',
        position: 'Software Developer',
        duration: 'Jun 2015 - Dec 2017',
      },
    ],
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically send the updated profile to your backend
    console.log('Saving profile:', profile)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }))
  }

  console.log('log');
  

  const [data, setData] = useState([])
  const fetchUser = async () => {
    const response = await fetch(`${BaseApiUrl}/user/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      // If the response is not OK (e.g., 401 Unauthorized), handle it
      localStorage.removeItem('token');
      router.push("/");
    }

    const json = await response.json();
    if (json) {
      console.log(json);
      setData(json.user)
   

      // dispatch(setUser(json.user));
    }
  }


  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Profile</h2>
        {isEditing ? (
          <Button onClick={handleSave}>Save Changes</Button>
        ) : (
          <Button onClick={handleEdit}>Edit Profile</Button>
        )}
      </div>

      <div className="flex items-center mb-6">
        <Avatar className="h-24 w-24 mr-4">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt={data.userName} />
          <AvatarFallback>{data.userName?.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <Input
            name="name"
            value={data.userName}
            onChange={handleChange}
            readOnly={!isEditing}
            className="text-2xl font-bold mb-2"
          />
          <Input
            name="location"
            value={data.location}
            onChange={handleChange}
            readOnly={!isEditing}
            className="text-gray-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <Input
            name="email"
            value={data?.email}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <Input
            name="phone"
            value={data?.phone}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
        <Textarea
          name="about"
          value={data?.about}
          onChange={handleChange}
          readOnly={!isEditing}
          rows={4}
        />
      </div>

      {/* <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {skill}
            </span>
          ))}
        </div>
      </div> */}

      {/* <div>
        <h3 className="text-lg font-semibold mb-2">Experience</h3>
        {profile.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-medium">{exp.position}</h4>
            <p className="text-gray-600">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.duration}</p>
          </div>
        ))}
      </div> */}
    </motion.div>
  )
}

export default MyProfile    