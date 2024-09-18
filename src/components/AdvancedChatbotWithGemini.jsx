'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Loader2, X, Send, MessageCircle, User, Maximize2, Minimize2 } from 'lucide-react'
import { GoogleGenerativeAI } from "@google/generative-ai"


const API_KEY = "AIzaSyD7Mm9SV3aCYnG5HdBibCoBwoth8TYpLW4"
const genAI = new GoogleGenerativeAI(API_KEY)

export default function AdvancedChatbotWithGemini() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const [chatSession, setChatSession] = useState(null)

  const prebuiltCommands = [
    { label: 'Help', action: () => handleSend('Help') },
    { label: 'About', action: () => handleSend('Tell me about CodePathshala') },
    { label: 'Courses', action: () => handleSend('What courses are available?') },
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize chat session when component mounts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    const newChatSession = model.startChat({
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    })
    setChatSession(newChatSession)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = async (text) => {
    const userMessage = { role: 'user', content: text, timestamp: new Date().toLocaleTimeString() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      const result = await chatSession.sendMessage(text)
      const response = await result.response
      const botMessage = { role: 'bot', content: response.text(), timestamp: new Date().toLocaleTimeString() }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error getting AI response:', error)
      const errorMessage = { role: 'bot', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toLocaleTimeString() }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`${isExpanded ? 'w-[80vw] h-[80vh]' : 'w-96 h-[32rem]'} transition-all duration-300`}
          >
            <Card className="h-full shadow-lg flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">CodePathshala AI</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={toggleExpand} aria-label={isExpanded ? "Minimize chat" : "Maximize chat"}>
                    {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close chat">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-grow overflow-hidden p-4">
                <ScrollArea className="h-full w-full pr-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                      <div className={`flex items-end ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
                        <Avatar className={`h-8 w-8 ${msg.role === 'user' ? 'ml-2' : 'mr-2'}`}>
                          {msg.role === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : (
                            <AvatarImage src="/chatbot-avatar.png" alt="Chatbot" />
                          )}
                          <AvatarFallback>{msg.role === 'user' ? 'U' : 'CB'}</AvatarFallback>
                        </Avatar>
                        <div className={`rounded-lg p-3 ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                          <p className="text-sm">{msg.content}</p>
                          <span className="text-xs opacity-50 mt-1 block">{msg.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start mb-4">
                      <div className="flex items-center bg-gray-100 rounded-lg p-3">
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        <span className="text-sm">AI is thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </ScrollArea>
              </CardContent>
              <CardFooter className="flex flex-col items-center p-4">
                <div className="flex flex-wrap justify-center space-x-2 mb-2">
                  {prebuiltCommands.map((command, index) => (
                    <Button key={index} variant="outline" size="sm" onClick={command.action} className="mb-2">
                      {command.label}
                    </Button>
                  ))}
                </div>
                <div className="flex w-full">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && input.trim() && handleSend(input)}
                    placeholder="Type a message..."
                    className="flex-grow"
                  />
                  <Button onClick={() => input.trim() && handleSend(input)} className="ml-2" disabled={!input.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Button
                    className="rounded-full w-16 h-16 p-0 shadow-lg bg-blue-500 hover:bg-blue-600"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open chat"
                  >
                    <MessageCircle className="h-8 w-8 text-white" />
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Chat with CodePathshala AI</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </AnimatePresence>
    </div>
  )
}