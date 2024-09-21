'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Clock, ArrowRight, ArrowLeft, Trophy, User, BarChart, BookOpen } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { tests } from '@/utils/testconstanst'


const testCategories = [
  { id: 'all', name: 'All Tests' },
  { id: 'js', name: 'JavaScript' },
  { id: 'react', name: 'React' },
  { id: 'node', name: 'Node.js' },
]



const leaderboard = [
  { id: 1, name: 'Alice Johnson', score: 95, avatar: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Bob Smith', score: 88, avatar: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'Charlie Brown', score: 82, avatar: '/placeholder.svg?height=40&width=40' },
  { id: 4, name: 'Diana Ross', score: 79, avatar: '/placeholder.svg?height=40&width=40' },
  { id: 5, name: 'Ethan Hunt', score: 75, avatar: '/placeholder.svg?height=40&width=40' },
]

export default function TestPage() {
  const [selectedTest, setSelectedTest] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [isTimeUp, setIsTimeUp] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [userStats, setUserStats] = useState({ testsCompleted: 15, averageScore: 82 })

  useEffect(() => {
    let timer
    if (selectedTest && timeLeft > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer)
            setIsTimeUp(true)
            setShowResults(true)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [selectedTest, timeLeft, showResults])

  const handleStartTest = (test) => {
    setSelectedTest(test)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setTimeLeft(test.timeLimit)
    setIsTimeUp(false)
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

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
  }

  const filteredTests = selectedCategory === 'all' 
    ? tests 
    : tests.filter(test => test.category === selectedCategory)

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">Skill Assessment Platform</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="tests" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tests">Avail</TabsTrigger>
              <TabsTrigger value="progress">Your Progress</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            <TabsContent value="tests">
              {!selectedTest ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Available Tests</h2>
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border rounded p-2"
                    >
                      {testCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredTests.map((test) => (
                      <Card key={test.id} className="overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                          <CardTitle>{test.title}</CardTitle>
                          <CardDescription className="text-purple-100">{test.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                          <p className="mb-4 text-gray-600">Questions: {test.questions.length}</p>
                          <p className="mb-4 text-gray-600">Time Limit: {formatTime(test.timeLimit)}</p>
                          <Button 
                            onClick={() => handleStartTest(test)}
                            className="w-full"
                          >
                            Start Test
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              ) : showResults ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Test Results</CardTitle>
                      {isTimeUp && (
                        <Alert variant="destructive">
                          <AlertTitle>Times Up!</AlertTitle>
                          <AlertDescription>
                            You didnt complete the test within the time limit.
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-lg">
                        Your score: {calculateScore()} / {selectedTest.questions.length}
                      </p>
                      <Progress 
                        value={(calculateScore() / selectedTest.questions.length) * 100} 
                        className="mb-6"
                      />
                      <div className="space-y-4">
                        {selectedTest.questions.map((question, index) => (
                          <Card key={question.id}>
                            <CardHeader>
                              <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="mb-2">{question.question}</p>
                              <p className="mb-2">Your answer: {answers[question.id] || 'Not answered'}</p>
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
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      <Button
                        onClick={() => setSelectedTest(null)}
                        className="mt-6"
                      >
                        Back to Test List
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{selectedTest.title}</CardTitle>
                      <div className="flex justify-between items-center">
                        <p className="text-lg font-medium">
                          Question {currentQuestion + 1} of {selectedTest.questions.length}
                        </p>
                        <p className="flex items-center text-lg font-medium">
                          <Clock className="mr-2 h-5 w-5" />
                          {formatTime(timeLeft)}
                        </p>
                      </div>
                      <Progress 
                        value={(currentQuestion / selectedTest.questions.length) * 100} 
                        className="mt-2"
                      />
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-lg">{selectedTest.questions[currentQuestion].question}</p>
                      <RadioGroup
                        onValueChange={(value) => handleAnswer(selectedTest.questions[currentQuestion].id, value)}
                        value={answers[selectedTest.questions[currentQuestion].id] || ''}
                      >
                        {selectedTest.questions[currentQuestion].options.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100">
                            <RadioGroupItem 
                              value={option} 
                              id={`option-${index}`}
                            />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                      <div className="flex justify-between mt-6">
                        <Button
                          onClick={handlePreviousQuestion}
                          disabled={currentQuestion === 0}
                          variant="outline"
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                        <Button onClick={handleNextQuestion}>
                          {currentQuestion < selectedTest.questions.length - 1 ? (
                            <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
                          ) : (
                            'Finish Test'
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </TabsContent>
            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-around items-center mb-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{userStats.testsCompleted}</p>
                      <p className="text-sm text-gray-500">Tests Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{userStats.averageScore}%</p>
                      <p className="text-sm text-gray-500">Average Score</p>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">Recent Activity</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between items-center">
                      <span>JavaScript Basics</span>
                      <span className="text-green-600">85%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>React Fundamentals</span>
                      <span className="text-yellow-600">70%</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span>Node.js Essentials</span>
                      <span className="text-green-600">90%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="leaderboard">
              <Card>
                <CardHeader>
                  <CardTitle>Global Leaderboard</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {leaderboard.map((user, index) => (
                      <li key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold w-6">{index + 1}.</span>
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                        <span className="font-semibold">{user.score}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          {/* <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-gray-500">Web Developer</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Tests Completed</span>
                  <span className="font-semibold">{userStats.testsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Score</span>
                  <span className="font-semibold">{userStats.averageScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Ranking</span>
                  <span className="font-semibold">#42</span>
                </div>
              </div>
            </CardContent>
          </Card> */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Trophy className="h-8 w-8 mx-auto text-yellow-500" />
                  <p className="mt-2 font-semibold">5 Badges</p>
                </div>
                <div className="text-center">
                  <BarChart className="h-8 w-8 mx-auto text-blue-500" />
                  <p className="mt-2 font-semibold">Level 7</p>
                </div>
                <div className="text-center">
                  <User className="h-8 w-8 mx-auto text-green-500" />
                  <p className="mt-2 font-semibold">3 Followers</p>
                </div>
                <div className="text-center">
                  <BookOpen className="h-8 w-8 mx-auto text-purple-500" />
                  <p className="mt-2 font-semibold">12 Skills</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}