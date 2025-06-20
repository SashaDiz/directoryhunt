import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Upload, Calendar, DollarSign, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function SubmitAppPage() {
  const [formData, setFormData] = useState({
    name: '',
    short_description: '',
    full_description: '',
    website_url: '',
    logo_url: '',
    screenshots: ['', '', '', '', ''],
    video_url: '',
    launch_week: '',
    is_paid: false
  })
  
  const [availableWeeks, setAvailableWeeks] = useState([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Mock available weeks
  useEffect(() => {
    const weeks = []
    const now = new Date()
    
    for (let i = 0; i < 8; i++) {
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() + (i * 7))
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1) // Monday
      
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      
      weeks.push({
        start_date: weekStart.toISOString(),
        end_date: weekEnd.toISOString(),
        available_slots: Math.max(0, 15 - Math.floor(Math.random() * 10)),
        is_full: Math.random() > 0.7
      })
    }
    
    setAvailableWeeks(weeks)
  }, [])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleScreenshotChange = (index, value) => {
    const newScreenshots = [...formData.screenshots]
    newScreenshots[index] = value
    setFormData(prev => ({ ...prev, screenshots: newScreenshots }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 2000)
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Submission Successful!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your app has been submitted successfully. You'll receive an email confirmation shortly.
        </p>
        <div className="space-x-4">
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Submit Another App
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Submit Your Travel App</h1>
        <p className="text-lg text-gray-600">
          Join our weekly launches and showcase your travel-related app to the community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">App Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., TravelMate Navigator"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website_url">Website URL *</Label>
                <Input
                  id="website_url"
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => handleInputChange('website_url', e.target.value)}
                  placeholder="https://your-app.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description *</Label>
              <Input
                id="short_description"
                value={formData.short_description}
                onChange={(e) => handleInputChange('short_description', e.target.value)}
                placeholder="Brief description (max 200 characters)"
                maxLength={200}
                required
              />
              <p className="text-sm text-gray-500">
                {formData.short_description.length}/200 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_description">Full Description *</Label>
              <Textarea
                id="full_description"
                value={formData.full_description}
                onChange={(e) => handleInputChange('full_description', e.target.value)}
                placeholder="Detailed description of your app, features, and benefits..."
                rows={6}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Media */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Media</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="logo_url">Logo URL</Label>
              <Input
                id="logo_url"
                type="url"
                value={formData.logo_url}
                onChange={(e) => handleInputChange('logo_url', e.target.value)}
                placeholder="https://your-app.com/logo.png"
              />
              <p className="text-sm text-gray-500">
                Square logo recommended (minimum 200x200px)
              </p>
            </div>

            <div className="space-y-4">
              <Label>Screenshots (up to 5)</Label>
              {formData.screenshots.map((screenshot, index) => (
                <Input
                  key={index}
                  type="url"
                  value={screenshot}
                  onChange={(e) => handleScreenshotChange(index, e.target.value)}
                  placeholder={`Screenshot ${index + 1} URL`}
                />
              ))}
              <p className="text-sm text-gray-500">
                Add URLs to your app screenshots. Mobile screenshots recommended.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video_url">Video URL (Optional)</Label>
              <Input
                id="video_url"
                type="url"
                value={formData.video_url}
                onChange={(e) => handleInputChange('video_url', e.target.value)}
                placeholder="https://youtube.com/embed/your-video or https://vimeo.com/your-video"
              />
              <p className="text-sm text-gray-500">
                YouTube or Vimeo embed URL for app demo video
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Launch Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Launch Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="launch_week">Launch Week</Label>
              <Select value={formData.launch_week} onValueChange={(value) => handleInputChange('launch_week', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a launch week" />
                </SelectTrigger>
                <SelectContent>
                  {availableWeeks.map((week, index) => (
                    <SelectItem 
                      key={index} 
                      value={week.start_date}
                      disabled={week.is_full && !formData.is_paid}
                    >
                      {new Date(week.start_date).toLocaleDateString()} - {new Date(week.end_date).toLocaleDateString()}
                      {week.is_full && !formData.is_paid ? ' (Full)' : ` (${week.available_slots} slots left)`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="is_paid"
                checked={formData.is_paid}
                onCheckedChange={(checked) => handleInputChange('is_paid', checked)}
              />
              <Label htmlFor="is_paid" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Featured Submission ($99)</span>
              </Label>
            </div>

            {formData.is_paid && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Featured submissions bypass the weekly limit, get published immediately, 
                  and receive permanent dofollow links. Payment will be processed after form submission.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Terms & Submit */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                By submitting your app, you agree to our{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </Link>
                . Your app will be reviewed before being published.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  type="submit" 
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                >
                  {loading ? 'Submitting...' : formData.is_paid ? 'Submit & Pay $99' : 'Submit App'}
                </Button>
                
                <Link to="/">
                  <Button variant="outline" type="button" className="w-full sm:w-auto">
                    Cancel
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}

