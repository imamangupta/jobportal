'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendHorizontal, Search, Bot } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const users = [
  { id: 'ai', name: 'AI Assistant', avatar: '/placeholder.svg?height=50&width=50', lastMessage: 'How can I help you today?' },
  { id: 1, name: 'Alice Johnson', avatar: '/placeholder.svg?height=50&width=50', lastMessage: 'Hey, how are you?' },
  { id: 2, name: 'Bob Smith', avatar: '/placeholder.svg?height=50&width=50', lastMessage: 'Can we meet tomorrow?' },
  { id: 3, name: 'Charlie Brown', avatar: '/placeholder.svg?height=50&width=50', lastMessage: 'I sent you the files.' },
]

const dummyMessages = {
  'ai': [
    { id: 1, senderId: 'ai', content: 'Hello! How can I assist you today?', timestamp: '10:00 AM' },
  ],
  1: [
    { id: 1, senderId: 1, content: 'Hey, how are you?', timestamp: '10:00 AM' },
    { id: 2, senderId: 0, content: 'Im good, thanks! How about you?', timestamp: '10:05 AM' },
  ],
  2: [
    { id: 1, senderId: 2, content: 'Can we meet tomorrow?', timestamp: '11:00 AM' },
    { id: 2, senderId: 0, content: 'Sure, what time works for you?', timestamp: '11:05 AM' },
  ],
  3: [
    { id: 1, senderId: 3, content: 'I sent you the files.', timestamp: '12:00 PM' },
    { id: 2, senderId: 0, content: 'Got them, thanks!', timestamp: '12:05 PM' },
  ],
}

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyD7Mm9SV3aCYnG5HdBibCoBwoth8TYpLW4";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export default function MessagingApp() {
  const [selectedUser, setSelectedUser] = useState(users[0])
  const [messages, setMessages] = useState({})
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [chatSession, setChatSession] = useState(null)
  const [isAiThinking, setIsAiThinking] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    setMessages(dummyMessages)
    const session = model.startChat({
      generationConfig,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
    setChatSession(session)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, selectedUser])

  const handleUserClick = (user) => {
    setSelectedUser(user)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (newMessage.trim() && selectedUser) {
      const newMsg = {
        id: messages[selectedUser.id].length + 1,
        senderId: 0,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedUser.id]: [...prevMessages[selectedUser.id], newMsg]
      }))
      setNewMessage('')

      if (selectedUser.id === 'ai') {
        setIsAiThinking(true)
        try {
          const result = await chatSession.sendMessage(newMessage);
          const aiResponse = {
            id: messages[selectedUser.id].length + 2,
            senderId: 'ai',
            content: result.response.text(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
          setMessages(prevMessages => ({
            ...prevMessages,
            [selectedUser.id]: [...prevMessages[selectedUser.id], aiResponse]
          }))
        } catch (error) {
          console.error('Error getting AI response:', error)
        } finally {
          setIsAiThinking(false)
        }
      }
    }
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* User list */}
      <motion.div 
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-1/4 bg-white border-r flex flex-col"
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-4">Chats</h2>
          <div className="relative">
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
        <ScrollArea className="flex-grow">
          {filteredUsers.map(user => (
            <motion.div
              key={user.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${selectedUser?.id === user.id ? 'bg-gray-100' : ''}`}
              onClick={() => handleUserClick(user)}
            >
              <Avatar className="h-12 w-12">
                {user.id === 'ai' ? (
                  <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white">
                    <Bot size={24} />
                  </div>
                ) : (
                  <AvatarImage src={user.avatar} alt={user.name} />
                )}
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="ml-4 overflow-hidden">
                <h3 className="font-semibold truncate">{user.name}</h3>
                <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
              </div>
            </motion.div>
          ))}
        </ScrollArea>
      </motion.div>

      {/* Chat window */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedUser.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col h-screen"
        >
          {/* Chat header */}
          <div className="bg-white p-4 flex items-center justify-between border-b shadow-sm">
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                {selectedUser.id === 'ai' ? (
                  <div className="h-full w-full flex items-center justify-center bg-blue-500 text-white">
                    <Bot size={20} />
                  </div>
                ) : (
                  <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                )}
                <AvatarFallback>{selectedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="ml-4 text-xl font-semibold">{selectedUser.name}</h2>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-grow p-4 bg-gray-50">
            {messages[selectedUser.id]?.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex mb-4 ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] p-3 rounded-lg ${message.senderId === 0 ? 'bg-blue-500 text-white' : 'bg-white'}`}>
                  <p>{message.content}</p>
                  <p className={`text-xs mt-1 ${message.senderId === 0 ? 'text-blue-100' : 'text-gray-500'}`}>{message.timestamp}</p>
                </div>
              </motion.div>
            ))}
            {isAiThinking && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex justify-start mb-4"
              >
                <div className="bg-white p-3 rounded-lg flex items-center">
                  <div className="mr-2">AI is thinking</div>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      transition: { repeat: Infinity, duration: 1 }
                    }}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      transition: { repeat: Infinity, duration: 1, delay: 0.2 }
                    }}
                    className="w-2 h-2 bg-blue-500 rounded-full mx-1"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      transition: { repeat: Infinity, duration: 1, delay: 0.4 }
                    }}
                    className="w-2 h-2 bg-blue-500 rounded-full"
                  />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>

          {/* Message input */}
          <form onSubmit={handleSendMessage} className="bg-white p-4 border-t flex items-center">
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 mr-4"
            />
            <Button type="submit" className="px-6" disabled={isAiThinking}>
              <SendHorizontal className="h-5 w-5 mr-2" />
              Send
            </Button>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}