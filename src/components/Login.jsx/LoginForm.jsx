'use client'

import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Box, Text, Float } from '@react-three/drei'
import { FaGoogle, FaApple } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { BaseApiUrl } from '@/utils/constanst'
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

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
        CodePathshala
      </Text>
    </>
  )
}

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = () => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isPasswordValid = password.length >= 6 // Assuming a minimum password length of 6
    setIsFormValid(isEmailValid && isPasswordValid)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    console.log(email, password)

    try {
      const response = await fetch(`${BaseApiUrl}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
      })
      const json = await response.json()

      if (json.data) {
        console.log(json)
        toast.success("Login Successful")
        localStorage.setItem('token', json.data.token)
        router.push("/dashboard")
      } else {
        toast.error("Invalid Credentials")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast.error("An error occurred during login")
    } finally {
      setIsLoading(false)
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to Your Account</h2>
        <p className="text-center text-gray-600 mb-6">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            SIGN UP
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>
          <Button
            className="w-full mt-6"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'LOG IN'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}