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

const snippets = {
  javascript: `// JavaScript Example
console.log("Hello, World!");

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci(10):", fibonacci(10));`,
  python: `# Python Example
print("Hello, World!")

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Fibonacci(10):", fibonacci(10))`,
  java: `// Java Example
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Fibonacci(10): " + fibonacci(10));
    }

    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`,
  cpp: `// C++ Example
#include <iostream>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    std::cout << "Hello, World!" << std::endl;
    std::cout << "Fibonacci(10): " << fibonacci(10) << std::endl;
    return 0;
}`,
  csharp: `// C# Example
using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
        Console.WriteLine($"Fibonacci(10): {Fibonacci(10)}");
    }

    static int Fibonacci(int n)
    {
        if (n <= 1) return n;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
}`,
}

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
    } else {
      setCode(snippets[language])
    }
  }, [])

  useEffect(() => {
    setCode(snippets[language])
  }, [language])

  const handleRunCode = async () => {
    setIsRunning(true)
    setOutput('')

    try {
      let result
      switch (language) {
        case 'javascript':
          result = await runJavaScript(code)
          break
        case 'python':
          result = runPython(code)
          break
        case 'java':
          result = runJava(code)
          break
        case 'cpp':
          result = runCPP(code)
          break
        case 'csharp':
          result = runCSharp(code)
          break
        default:
          result = 'Unsupported language'
      }
      setOutput(result)
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    } finally {
      setIsRunning(false)
    }
  }

  const runJavaScript = (code) => {
    return new Promise((resolve) => {
      let output = ''
      const originalLog = console.log
      console.log = (...args) => {
        output += args.join(' ') + '\n'
      }

      try {
        eval(code)
      } catch (error) {
        output += `Error: ${error.message}\n`
      }

      console.log = originalLog
      resolve(output || 'Code executed successfully, but produced no output.')
    })
  }

  const runPython = (code) => {
    let output = ''
    const lines = code.split('\n')
    let variables = {}

    for (let line of lines) {
      line = line.trim()
      if (line.startsWith('print(')) {
        const content = line.slice(6, -1)
        try {
          const result = evalPythonExpression(content, variables)
          output += result + '\n'
        } catch (error) {
          output += `Error: ${error.message}\n`
        }
      } else if (line.includes('=')) {
        const [varName, varValue] = line.split('=').map(s => s.trim())
        try {
          variables[varName] = evalPythonExpression(varValue, variables)
        } catch (error) {
          output += `Error: ${error.message}\n`
        }
      }
    }
    return output || 'Code executed successfully, but produced no output.'
  }

  const evalPythonExpression = (expr, variables) => {
    // This is a very basic evaluation and won't work for complex expressions
    return eval(expr.replace(/(\w+)/g, (_, name) => variables[name] || name))
  }

  const runJava = (code) => {
    let output = ''
    const lines = code.split('\n')
    for (let line of lines) {
      if (line.includes('System.out.println')) {
        const content = line.match(/System\.out\.println$$(.*?)$$;/)
        if (content) {
          try {
            output += eval(content[1]) + '\n'
          } catch (error) {
            output += `Error: ${error.message}\n`
          }
        }
      }
    }
    return output || 'Code executed successfully, but produced no output.'
  }

  const runCPP = (code) => {
    let output = ''
    const lines = code.split('\n')
    for (let line of lines) {
      if (line.includes('std::cout')) {
        const content = line.match(/std::cout << (.*?) << std::endl;/)
        if (content) {
          try {
            output += eval(content[1]) + '\n'
          } catch (error) {
            output += `Error: ${error.message}\n`
          }
        }
      }
    }
    return output || 'Code executed successfully, but produced no output.'
  }

  const runCSharp = (code) => {
    let output = ''
    const lines = code.split('\n')
    for (let line of lines) {
      if (line.includes('Console.WriteLine')) {
        const content = line.match(/Console\.WriteLine$$(.*?)$$;/)
        if (content) {
          try {
            output += eval(content[1]) + '\n'
          } catch (error) {
            output += `Error: ${error.message}\n`
          }
        }
      }
    }
    return output || 'Code executed successfully, but produced no output.'
  }

  const handleSaveCode = () => {
    localStorage.setItem('savedCode', code)
    alert('Code saved successfully!')
  }

  const handleClearCode = () => {
    if (window.confirm('Are you sure you want to clear the code?')) {
      setCode('')
      setOutput('')
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