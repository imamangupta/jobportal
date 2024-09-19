"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Send, User, Bot } from 'lucide-react'
import Layout from '@/components/Course/Layout'
import NavBar from '@/components/NavBar'

const DoubtSolverPage = () => {
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef(null)
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  
    useEffect(scrollToBottom, [messages])
  
    const handleSendMessage = () => {
      if (input.trim()) {
        const newMessages = [...messages, { text: input, isUser: true }]
        setMessages(newMessages)
        setInput('')
        
        // Simulate bot response
        setTimeout(() => {
          setMessages([
            ...newMessages,
            { text: "I'm an AI assistant. How can I help you with your course-related questions?", isUser: false }
          ])
        }, 1000)
      }
    }
    return (
        <>
        <NavBar/>
        <Layout>
          <div className="flex h-[calc(100vh-4rem)] flex-col space-y-4">
            <h1 className="text-3xl font-bold text-gray-900">Doubt Solver</h1>
            <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-gray-50 shadow-sm">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
              <div
              key={index}
              className={`mb-4 flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                    message.isUser
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-900 shadow'
                    }`}
                    >
                <div className="flex items-center space-x-2 mb-1">
                  {message.isUser ? (
                      <User className="h-4 w-4" />
                    ) : (
                        <Bot className="h-4 w-4" />
                    )}
                  <span className="font-semibold">
                    {message.isUser ? 'You' : 'AI Assistant'}
                  </span>
                </div>
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t bg-white p-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your question here..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
              />
            <button
              onClick={handleSendMessage}
              className="rounded-md bg-purple-600 p-2 text-white transition-colors duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
              >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
                </>
  )
}

export default DoubtSolverPage