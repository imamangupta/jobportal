'use client'

import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Text, Float } from '@react-three/drei'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FaGoogle, FaApple } from 'react-icons/fa'
import Link from 'next/link'
import { useRouter } from 'next/navigation';


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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isPasswordValid = password.length >= 8
    setIsFormValid(isEmailValid && isPasswordValid)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid) {
      // console.log('Form submitted:', { email, password })
      // alert('Sign up successful! Redirecting...')
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
      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 my-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Your Account</h2>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            SIGN IN
          </Link>
        </p>
        <form onSubmit={handleSubmit} onChange={validateForm}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button
            className="w-full mt-6"
            type="submit"
            disabled={!isFormValid}
          >
            SIGN UP
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">or</p>
          <div className="mt-4 space-y-3">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => alert('Continuing with Google...')}
            >
              <FaGoogle className="mr-2 h-4 w-4" /> Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full bg-black text-white hover:bg-gray-800"
              onClick={() => alert('Continuing with Apple...')}
            >
              <FaApple className="mr-2 h-4 w-4" /> Continue with Apple
            </Button>
          </div>
        </div>
        <p className="mt-8 text-xs text-center text-gray-500">
          By clicking Sign Up you agree to our{" "}
          <a href="/terms" className="text-blue-500 hover:underline">
            Terms of Service
          </a>{" "}
          &{" "}
          <a href="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </a>
        </p>
        <p className="mt-4 text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            Continue without signup?{" "}
            <span className="text-gray-600">EXPLORE</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
