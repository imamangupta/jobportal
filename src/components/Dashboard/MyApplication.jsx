'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MessageSquare } from 'lucide-react'
import { BaseApiUrl } from '@/utils/constanst'
import Link from 'next/link'

export default function MyApplication({ data }) {


    const [app, setApp] = useState([])
    const fetchUser = async () => {
        const response = await fetch(`${BaseApiUrl}/app/getUserApp`, {
            method: 'GET',
            headers: {
                'userid': data.userId
            }
        });


        const json = await response.json();
        if (json) {
            console.log(json);

            setApp(json.app)

        }
    }


    useEffect(() => {
        fetchUser()
    }, [])



    return (
        <>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow p-6 max-w-6xl mx-auto"
            >
                <h2 className="text-2xl font-semibold mb-6">My Application Send</h2>


                <AnimatePresence>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>username</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>

                                <TableHead>Resume</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {app.map((data, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <TableCell>{data.userName}</TableCell>
                                    <TableCell>{data.email}</TableCell>
                                    <TableCell>{data.phone}</TableCell>

                                    <TableCell>
                                        <Link href={`/resume/${data.studentId}`} target='_blank'>
                                            <Button variant="link" >
                                                View Resume
                                            </Button>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/dashboard?nav=Message`}>
                                        <Button variant="outline" size="sm" >
                                            <MessageSquare className="h-4 w-4 mr-2" />
                                            Chat Now
                                        </Button>
                                        </Link>
                                    </TableCell>
                                </motion.tr>
                            ))

                            }


                        </TableBody>
                    </Table>
                </AnimatePresence>
            </motion.div>

        </>
    )
}
