"use client";
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SendIcon } from 'lucide-react'

const Message = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'HR Manager', content: 'Hello! Thanks for your application. When are you available for an interview?', timestamp: '2023-05-20 10:30' },
    { id: 2, sender: 'You', content: 'Hello! Im available next week on Tuesday or Thursday afternoon. What works best for you?', timestamp: '2023-05-20 11:15' },
  ])

  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleString(),
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6">Messages</h2>

      <div className="mb-6 h-96 overflow-y-auto border rounded p-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex mb-4 ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex ${message.sender === 'You' ? 'flex-row-reverse' : 'flex-row'}`}>
              <Avatar className="w-8 h-8">
                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={message.sender} />
                <AvatarFallback>{message.sender[0]}</AvatarFallback>
              </Avatar>
              <div className={`mx-2 p-3 rounded-lg ${message.sender === 'You' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                <p className="text-sm font-semibold">{message.sender}</p>
                <p>{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage}>
          <SendIcon className="mr-2 h-4 w-4" /> Send
        </Button>
      </div>
    </motion.div>
  )
}

export default Message