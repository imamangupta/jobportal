"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { motion } from 'framer-motion'
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { BaseApiUrl } from '@/utils/constanst'
export default function Otp() {
    const [otp, setOtp] = useState('')
    const router = useRouter()

  
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Entered OTP:', otp) // Log the OTP value






        const response = await fetch(`${BaseApiUrl}/user/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: localStorage.getItem('email'), userotp: otp })
        });
        const json = await response.json();

        if (json.message) {
            

            const response2 = await fetch(`https://jobportal-backend-wine.vercel.app/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: json.data.userObject.userName, secret: 'secret', email: json.data.userObject.email, first_name: json.firstname, last_name: json.lastname, })
            });
            const json2 = await response2.json();

            localStorage.setItem('token', json.data.token)
            toast.success("Signup SuccessFull", json2);
            router.push("/dashboard")
        } else {
            toast.error("Error to Create");
        }




        // Add more form processing logic here, e.g., sending the OTP to an API
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-5 my-4"
            >
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">OTP Verify</h2>
                <p className="text-center text-gray-600 mb-3 text-sm">
                    Send SuccessFully Otp to Email

                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <Label htmlFor="otp" className="text-sm">OTP</Label>
                        <Input
                            id="otp"
                            name="otp"
                            placeholder="Enter OTP"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)} // Update state on change
                            required
                            className="mt-1"
                        />
                    </div>
                    <Button className="w-full" type="submit">
                        Verify OTP
                    </Button>
                </form>
            </motion.div>
        </div>
    )
}
