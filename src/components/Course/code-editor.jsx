"use client"
import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Loader2, Play, Save, Trash2 } from 'lucide-react'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
]

const themes = [
  { value: 'vs-dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
]

const CodeEditorPage = () => {
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState('vs-dark')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const savedCode = localStorage.getItem('savedCode')
    if (savedCode) {
      setCode(savedCode)
    }
  }, [])

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('')

    try {
      // In a real application, you would send the code to a backend service
      // for execution. Here, we're simulating the process with a delay.
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Simulate output based on the language
      let simulatedOutput = ''
      switch (language) {
        case 'javascript':
          simulatedOutput = `JavaScript Output:\n${eval(code)}`
          break
        case 'python':
          simulatedOutput = 'Python output would appear here after backend execution.'
          break
        default:
          simulatedOutput = `Simulated output for ${language}:\n${code}`
      }

      setOutput(simulatedOutput)
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const handleSaveCode = () => {
    localStorage.setItem('savedCode', code)
    alert('Code saved successfully!')
  }

  const handleClearCode = () => {
    if (window.confirm('Are you sure you want to clear the code?')) {
      setCode('')
      localStorage.removeItem('savedCode')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Code Editor</h1>
      <div className="flex items-center space-x-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        >
          {themes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleRunCode}
          disabled={isRunning}
          className="flex items-center rounded-md bg-green-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 disabled:opacity-50"
        >
          {isRunning ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Play className="mr-2 h-4 w-4" />
          )}
          Run Code
        </button>
        <button
          onClick={handleSaveCode}
          className="flex items-center rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          <Save className="mr-2 h-4 w-4" />
          Save
        </button>
        <button
          onClick={handleClearCode}
          className="flex items-center rounded-md bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <MonacoEditor
            height="400px"
            language={language}
            theme={theme}
            value={code}
            onChange={setCode}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
            }}
          />
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h2 className="mb-2 text-lg font-semibold">Output:</h2>
          <pre className="h-96 overflow-auto rounded-md bg-gray-100 p-4 font-mono text-sm">
            {output || 'Run your code to see the output here.'}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default CodeEditorPage