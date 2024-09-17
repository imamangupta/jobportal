"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Text, Float } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FaGoogle } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

function BackgroundScene() {
  const sphereRef = useRef()
  const boxRef = useRef()

  useFrame((state, delta) => {
    sphereRef.current.rotation.y += delta * 0.2
    boxRef.current.rotation.x += delta * 0.2
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Float speed={1} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[3, 32, 32]} position={[-4, -2, -5]}>
          <meshStandardMaterial color="#8B5CF6" wireframe opacity={0.2} transparent />
        </Sphere>
      </Float>
      <Float speed={0.8} rotationIntensity={0.8} floatIntensity={0.8}>
        <Box ref={boxRef} args={[4, 4, 4]} position={[4, 2, -5]}>
          <meshStandardMaterial color="#6366F1" wireframe opacity={0.2} transparent />
        </Box>
      </Float>
      <Text
        position={[0, 4, -3]}
        fontSize={1.5}
        color="#4B5563"
        anchorX="center"
        anchorY="middle"
      >
        CodePathshal
      </Text>
    </>
  )
}

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: '',
    collegeName: '',
    graduationYear: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    jobTitle: '',
    industry: '',
    hrPhoneNumber: ''
  })
  const [isFormValid, setIsFormValid] = useState(false)
  const router = useRouter()

  useEffect(() => {
    validateForm()
  }, [formData])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const validateForm = () => {
    const {
      email,
      password,
      userType,
      collegeName,
      graduationYear,
      gender,
      dob,
      phoneNumber,
      jobTitle,
      industry,
      hrPhoneNumber
    } = formData

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isPasswordValid = password.length >= 8
    let isUserTypeValid = false

    if (userType === 'student') {
      isUserTypeValid = collegeName && graduationYear && gender && dob && phoneNumber
    } else if (userType === 'hr') {
      isUserTypeValid = jobTitle && industry && hrPhoneNumber
    }

    setIsFormValid(isEmailValid && isPasswordValid && isUserTypeValid)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid) {
      console.log('Form submitted:', formData)
      alert('Sign up successful! Redirecting...')
      router.push('/login')
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden p-4">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <BackgroundScene />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-5 my-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">Create Your Account</h2>
        <p className="text-center text-gray-600 mb-3 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            SIGN IN
          </Link>
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="email" className="text-sm">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Enter your email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm">Password</Label>
            <Input
              id="password"
              name="password"
              placeholder="Enter your password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label className="text-sm">I am a</Label>
            <RadioGroup
              name="userType"
              value={formData.userType}
              onValueChange={(value) => handleInputChange({ target: { name: 'userType', value } })}
              className="flex space-x-4 mt-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="text-sm">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hr" id="hr" />
                <Label htmlFor="hr" className="text-sm">HR / Company</Label>
              </div>
            </RadioGroup>
          </div>
          <AnimatePresence mode="wait">
            {formData.userType === 'student' && (
              <motion.div
                key="student-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div>
                  <Label htmlFor="collegeName" className="text-sm">College Name</Label>
                  <Input
                    id="collegeName"
                    name="collegeName"
                    placeholder="Enter your college name"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="graduationYear" className="text-sm">Expected Graduation Year</Label>
                  <Input
                    id="graduationYear"
                    name="graduationYear"
                    placeholder="Enter graduation year"
                    type="number"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="w-1/2">
                    <Label htmlFor="gender" className="text-sm">Gender</Label>
                    <select
                      id="gender"
                      name="gender"
                      className="w-full p-2 border rounded mt-1 text-sm"
                      value={formData.gender}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="w-1/2">
                    <Label htmlFor="dob" className="text-sm">Date of Birth</Label>
                    <Input
                      id="dob"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phoneNumber" className="text-sm">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </motion.div>
            )}
            {formData.userType === 'hr' && (
              <motion.div
                key="hr-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                <div>
                  <Label htmlFor="jobTitle" className="text-sm">Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    placeholder="Enter your job title"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="industry" className="text-sm">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    placeholder="Enter your industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="hrPhoneNumber" className="text-sm">Phone Number</Label>
                  <Input
                    id="hrPhoneNumber"
                    name="hrPhoneNumber"
                    placeholder="Enter your phone number"
                    type="tel"
                    value={formData.hrPhoneNumber}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            className="w-full"
            type="submit"
            disabled={!isFormValid}
          >
            SIGN UP
          </Button>
        </form>
        <div className="mt-3 text-center">
          <p className="text-gray-600 text-xs">or</p>
          <Button
            variant="outline"
            className="w-full mt-2 text-sm"
            onClick={() => alert('Continuing with Google...')}
          >
            <FaGoogle className="mr-2 h-3 w-3" /> Continue with Google
          </Button>
        </div>
        <p className="mt-3 text-xs text-center text-gray-500">
          By clicking Sign Up you agree to our{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          &{" "}
          <a href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
        </p>
        <p className="mt-2 text-center text-xs">
          <Link href="/" className="text-blue-500 hover:underline">
            Continue without signup?{" "}
            <span className="text-gray-600">EXPLORE</span>
          </Link>
        </p>
      </motion.div>
    </div>
  )
}