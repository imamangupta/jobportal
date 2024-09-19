"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, User, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import your Google Generative AI SDK

const API_KEY = 'AIzaSyD7Mm9SV3aCYnG5HdBibCoBwoth8TYpLW4'; // Hardcoded API Key
const MODEL_NAME = 'gemini-1.5-flash'; // Model name

const DoubtSolverPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatSession, setChatSession] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize chat session with conversation history
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const newChatSession = model.startChat({
      generationConfig: {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
      },
    });

    setChatSession(newChatSession);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !chatSession) return;

    const userMessage = { role: 'user', content: input, timestamp: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const result = await chatSession.sendMessage(input);
      const response = await result.response;
      const botMessage = { role: 'bot', content: response.text(), timestamp: new Date().toLocaleTimeString() };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage = { role: 'bot', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date().toLocaleTimeString() };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      scrollToBottom();
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">Doubt Solver</h1>
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg border bg-gray-50 shadow-sm">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-900 shadow'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {message.role === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  <span className="font-semibold">
                    {message.role === 'user' ? 'You' : 'AI Assistant'}
                  </span>
                </div>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && <div className="text-gray-500">AI is typing...</div>}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t bg-white p-4">
          <form onSubmit={handleSend} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question here..."
              aria-label="Type your question"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="rounded-md bg-purple-600 p-2 text-white transition-colors duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoubtSolverPage;
