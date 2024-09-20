'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MessageSquare } from 'lucide-react'
import { BaseApiUrl } from '@/utils/constanst'

export default function MyApplication() {
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
                            <motion.tr
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TableCell>name</TableCell>
                                <TableCell>email</TableCell>
                                <TableCell>phone</TableCell>

                                <TableCell>
                                    <Button variant="link" >
                                        View Resume
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" >
                                        <MessageSquare className="h-4 w-4 mr-2" />
                                        Chat Now
                                    </Button>
                                </TableCell>
                            </motion.tr>

                        </TableBody>
                    </Table>
                </AnimatePresence>
            </motion.div>

        </>
    )
}
