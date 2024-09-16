"use client";
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ThumbsUpIcon, ThumbsDownIcon, ShareIcon } from 'lucide-react'

const NewsFeed = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: 'Top 10 In-Demand Tech Skills in India for 2023',
      content: 'As the tech industry continues to evolve, staying updated with the latest skills is crucial. This article explores the most sought-after tech skills in India for 2023, including AI, Machine Learning, and Cloud Computing.',
      source: 'TechTimes India',
      date: '2023-05-18',
      likes: 45,
      dislikes: 3,
    },
    {
      id: 2,
      title: 'How to Ace Your Next Technical Interview',
      content: 'Preparing for a technical interview can be daunting. This comprehensive guide provides tips and strategies to help you succeed in your next tech interview, covering topics from algorithm practice to soft skills.',
      source: 'CareerGuru',
      date: '2023-05-15',
      likes: 72,
      dislikes: 5,
    },
    {
      id: 3,
      title: 'The Rise of Remote Work in India Tech Sector',
      content: 'The COVID-19 pandemic has accelerated the adoption of remote work. This article examines how India tech sector is adapting to this new normal and what it means for job seekers and employers alike.',
      source: 'India Tech Weekly',
      date: '2023-05-10',
      likes: 58,
      dislikes: 7,
    },
  ])

  const handleLike = (id) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, likes: article.likes + 1 } : article
    ))
  }

  const handleDislike = (id) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, dislikes: article.dislikes + 1 } : article
    ))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6">News Feed</h2>

      {articles.map((article) => (
        <Card key={article.id} className="mb-6">
          <CardHeader>
            <CardTitle>{article.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{article.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{article.source}</span>
              <span>{article.date}</span>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={() => handleLike(article.id)}>
                <ThumbsUpIcon className="mr-2 h-4 w-4" /> {article.likes}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDislike(article.id)}>
                <ThumbsDownIcon className="mr-2 h-4 w-4" /> {article.dislikes}
              </Button>
              <Button variant="outline" size="sm">
                <ShareIcon className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  )
}

export default NewsFeed