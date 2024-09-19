import React, { useState } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'

const tests = [
  {
    id: 1,
    title: 'JavaScript Basics',
    description: 'Test your knowledge of JavaScript fundamentals',
    questions: [
      {
        id: 1,
        question: 'What is the result of 2 + "2"?',
        options: ['4', '"22"', 'NaN', 'TypeError'],
        correctAnswer: '"22"'
      },
      {
        id: 2,
        question: 'Which method is used to add an element to the end of an array?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 'push()'
      },
      {
        id: 3,
        question: 'What does the === operator do?',
        options: [
          'Checks for equality, but not type',
          'Checks for equality, including type',
          'Assigns a value to a variable',
          'Compares two variables and returns the larger one'
        ],
        correctAnswer: 'Checks for equality, including type'
      }
    ]
  },
  {
    id: 2,
    title: 'React Fundamentals',
    description: 'Evaluate your understanding of React core concepts',
    questions: [
      {
        id: 1,
        question: 'What hook is used to perform side effects in a function component?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 'useEffect'
      },
      {
        id: 2,
        question: 'What is the virtual DOM?',
        options: [
          'A direct copy of the real DOM',
          'A lightweight copy of the real DOM',
          'A JavaScript object',
          'A browser API'
        ],
        correctAnswer: 'A lightweight copy of the real DOM'
      },
      {
        id: 3,
        question: 'Which of the following is NOT a React Hook?',
        options: ['useCallback', 'useFetch', 'useMemo', 'useRef'],
        correctAnswer: 'useFetch'
      }
    ]
  }
]

const TestPage = () => {
  const [selectedTest, setSelectedTest] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  const handleStartTest = (test) => {
    setSelectedTest(test)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer })
  }

  const handleNextQuestion = () => {
    if (currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    let score = 0
    selectedTest.questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score++
      }
    })
    return score
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Tests</h1>
      {!selectedTest ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <div key={test.id} className="rounded-lg border bg-white p-6 shadow-sm">
              <h2 className="mb-2 text-xl font-semibold">{test.title}</h2>
              <p className="mb-4 text-gray-600">{test.description}</p>
              <p className="mb-4 text-gray-600">Questions: {test.questions.length}</p>
              <button
                onClick={() => handleStartTest(test)}
                className="w-full rounded-md bg-purple-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
              >
                Start Test
              </button>
            </div>
          ))}
        </div>
      ) : showResults ? (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">Test Results</h2>
          <p className="mb-4 text-lg">
            Your score: {calculateScore()} / {selectedTest.questions.length}
          </p>
          <div className="mb-6 space-y-4">
            {selectedTest.questions.map((question, index) => (
              <div key={question.id} className="rounded-lg border p-4">
                <p className="mb-2 font-medium">Question {index + 1}: {question.question}</p>
                <p className="mb-2">Your answer: {answers[question.id]}</p>
                <p className="mb-2">Correct answer: {question.correctAnswer}</p>
                {answers[question.id] === question.correctAnswer ? (
                  <p className="flex items-center text-green-600">
                    <CheckCircle className="mr-2 h-5 w-5" /> Correct
                  </p>
                ) : (
                  <p className="flex items-center text-red-600">
                    <XCircle className="mr-2 h-5 w-5" /> Incorrect
                  </p>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={() => setSelectedTest(null)}
            className="rounded-md bg-purple-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          >
            Back to Test List
          </button>
        </div>
      ) : (
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">{selectedTest.title}</h2>
          <div className="mb-6">
            <p className="mb-4 text-lg font-medium">
              Question {currentQuestion + 1} of {selectedTest.questions.length}
            </p>
            <p className="mb-4 text-gray-800">{selectedTest.questions[currentQuestion].question}</p>
            <div className="space-y-2">
              {selectedTest.questions[currentQuestion].options.map((option, index) => (
                <label key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                  <input
                    type="radio"
                    name={`question-${selectedTest.questions[currentQuestion].id}`}
                    value={option}
                    checked={answers[selectedTest.questions[currentQuestion].id] === option}
                    onChange={() => handleAnswer(selectedTest.questions[currentQuestion].id, option)}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleNextQuestion}
            className="rounded-md bg-purple-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
          >
            {currentQuestion < selectedTest.questions.length - 1 ? 'Next Question' : 'Finish Test'}
          </button>
        </div>
      )}
    </div>
  )
}

export default TestPage