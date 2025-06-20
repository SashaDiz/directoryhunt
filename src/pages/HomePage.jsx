import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Star, ExternalLink, TrendingUp, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function HomePage() {
  const [apps, setApps] = useState([])
  const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [loading, setLoading] = useState(true)
  const [votedApps, setVotedApps] = useState(new Set())
  const [votingLoading, setVotingLoading] = useState(new Set())

  // Mock data for development
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApps([
        {
          id: 1,
          name: "TravelMate Navigator",
          short_description: "AI-powered travel planning with real-time updates and local insights",
          logo_url: "https://via.placeholder.com/80x80/3B82F6/FFFFFF?text=TM",
          vote_count: 42,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com"
        },
        {
          id: 2,
          name: "StayFinder Pro",
          short_description: "Find and book unique accommodations worldwide with instant confirmation",
          logo_url: "https://via.placeholder.com/80x80/10B981/FFFFFF?text=SF",
          vote_count: 38,
          is_paid: true,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com"
        },
        {
          id: 3,
          name: "LocalEats Discovery",
          short_description: "Discover authentic local restaurants and hidden culinary gems",
          logo_url: "https://via.placeholder.com/80x80/F59E0B/FFFFFF?text=LE",
          vote_count: 35,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const nextMonday = new Date()
      nextMonday.setDate(now.getDate() + ((7 - now.getDay() + 1) % 7 || 7))
      nextMonday.setHours(0, 0, 0, 0)
      
      const diff = nextMonday - now
      
      if (diff > 0) {
        setTimeRemaining({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Handle voting
  const handleVote = async (appId) => {
    if (votedApps.has(appId) || votingLoading.has(appId)) return

    setVotingLoading(prev => new Set([...prev, appId]))

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update vote count
      setApps(prevApps => 
        prevApps.map(app => 
          app.id === appId 
            ? { ...app, vote_count: app.vote_count + 1 }
            : app
        )
      )
      
      // Mark as voted
      setVotedApps(prev => new Set([...prev, appId]))
      
    } catch (error) {
      console.error('Failed to vote:', error)
    } finally {
      setVotingLoading(prev => {
        const newSet = new Set(prev)
        newSet.delete(appId)
        return newSet
      })
    }
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Showcase Your Travel Apps
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join the premier platform for travel-related apps, services, and tools. 
          Launch weekly, get discovered, and connect with the travel tech community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/submit">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Submit Your App
            </Button>
          </Link>
          <Link to="/past-launches">
            <Button size="lg" variant="outline">
              View Past Launches
            </Button>
          </Link>
        </div>
      </section>

      {/* Countdown Timer */}
      <section className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Current Launch Week</h2>
          <p className="text-gray-600">Time until voting ends</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-lg p-4">
              <div className="text-2xl font-bold">{timeRemaining.days}</div>
              <div className="text-sm">Days</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-lg p-4">
              <div className="text-2xl font-bold">{timeRemaining.hours}</div>
              <div className="text-sm">Hours</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-lg p-4">
              <div className="text-2xl font-bold">{timeRemaining.minutes}</div>
              <div className="text-sm">Minutes</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-lg p-4">
              <div className="text-2xl font-bold">{timeRemaining.seconds}</div>
              <div className="text-sm">Seconds</div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Launch Apps */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Launching This Week</h2>
          <Badge variant="secondary" className="text-sm">
            {apps.length} / 15 Apps
          </Badge>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app, index) => (
              <Card key={app.id} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img 
                      src={app.logo_url} 
                      alt={app.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{app.name}</h3>
                        {app.is_paid && (
                          <Badge variant="secondary" className="text-xs">Featured</Badge>
                        )}
                        {index < 3 && (
                          <Badge variant="outline" className="text-xs">#{index + 1}</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{app.short_description}</p>
                    </div>
                  </div>
                  
                  {/* Vote Section */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <TrendingUp className="h-4 w-4" />
                      <span>{app.vote_count} votes</span>
                    </div>
                    
                    {app.is_active && (
                      <Button
                        size="sm"
                        variant={votedApps.has(app.id) ? "secondary" : "default"}
                        onClick={() => handleVote(app.id)}
                        disabled={votedApps.has(app.id) || votingLoading.has(app.id)}
                        className={`${
                          votedApps.has(app.id) 
                            ? "bg-green-100 text-green-700 hover:bg-green-100" 
                            : "bg-blue-600 hover:bg-blue-700"
                        } transition-colors`}
                      >
                        <ThumbsUp className={`h-4 w-4 mr-1 ${votingLoading.has(app.id) ? 'animate-pulse' : ''}`} />
                        {votingLoading.has(app.id) 
                          ? 'Voting...' 
                          : votedApps.has(app.id) 
                            ? 'Voted!' 
                            : 'Vote'
                        }
                      </Button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Link to={`/app/${app.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    
                    <a 
                      href={app.website_url} 
                      target="_blank" 
                      rel={app.is_paid ? "dofollow" : "nofollow"}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && apps.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Apps This Week</h3>
              <p className="text-gray-600 mb-4">Be the first to submit your travel app for this launch week!</p>
              <Link to="/submit">
                <Button>Submit Your App</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">1</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Submit Your App</h3>
            <p className="text-gray-600">Submit your travel-related app with details, screenshots, and choose your launch week.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">2</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Get Votes</h3>
            <p className="text-gray-600">Community members vote for their favorite apps during the weekly launch period.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <span className="font-bold">3</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Win & Get Featured</h3>
            <p className="text-gray-600">Top 3 apps become winners and receive permanent dofollow links and winner badges.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

