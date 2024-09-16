"use client";
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Select } from '@/components/ui/select'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

const Setting = () => {
  const [settings, setSettings] = useState({
    email: 'user@example.com',
    password: '',
    notifications: true,
    language: 'en',
    theme: 'light',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name] }))
  }

  const handleSave = () => {
    console.log('Saving settings:', settings)
    // Here you would typically send the settings to your backend
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={settings.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                value={settings.password}
                onChange={handleInputChange}
                placeholder="Enter new password"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="notifications" className="text-sm font-medium text-gray-700">Email Notifications</label>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={() => handleSwitchChange('notifications')}
              />
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
              <Select
                id="language"
                name="language"
                value={settings.language}
                onChange={handleInputChange}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
                <option value="te">Telugu</option>
              </Select>
            </div>
            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Theme</label>
              <Select
                id="theme"
                name="theme"
                value={settings.theme}
                onChange={handleInputChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave}>Save Settings</Button>
    </motion.div>
  )
}

export default Setting