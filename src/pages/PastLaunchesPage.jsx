import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Trophy, ExternalLink, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function PastLaunchesPage() {
  const [pastLaunches, setPastLaunches] = useState([])
  const [loading, setLoading] = useState(true)

  // Mock data for development
  useEffect(() => {
    setTimeout(() => {
      setPastLaunches([
        {
          week_start: '2025-06-09T00:00:00Z',
          week_end: '2025-06-15T23:59:59Z',
          apps: [
            {
              id: 101,
              name: 'FlightTracker Pro',
              short_description: 'Real-time flight tracking with predictive delay alerts',
              logo_url: 'https://via.placeholder.com/60x60/EF4444/FFFFFF?text=FT',
              vote_count: 89,
              is_winner: true,
              position: 1,
              website_url: 'https://example.com'
            },
            {
              id: 102,
              name: 'HotelFinder Elite',
              short_description: 'Premium hotel booking with exclusive member rates',
              logo_url: 'https://via.placeholder.com/60x60/10B981/FFFFFF?text=HF',
              vote_count: 76,
              is_winner: true,
              position: 2,
              website_url: 'https://example.com'
            },
            {
              id: 103,
              name: 'CityGuide AI',
              short_description: 'AI-powered city exploration and local recommendations',
              logo_url: 'https://via.placeholder.com/60x60/F59E0B/FFFFFF?text=CG',
              vote_count: 64,
              is_winner: true,
              position: 3,
              website_url: 'https://example.com'
            },
            {
              id: 104,
              name: 'PackSmart',
              short_description: 'Smart packing lists based on destination and weather',
              logo_url: 'https://via.placeholder.com/60x60/8B5CF6/FFFFFF?text=PS',
              vote_count: 52,
              is_winner: false,
              position: 4,
              website_url: 'https://example.com'
            }
          ]
        },
        {
          week_start: '2025-06-02T00:00:00Z',
          week_end: '2025-06-08T23:59:59Z',
          apps: [
            {
              id: 201,
              name: 'TripBudget Manager',
              short_description: 'Comprehensive travel expense tracking and budgeting',
              logo_url: 'https://via.placeholder.com/60x60/06B6D4/FFFFFF?text=TB',
              vote_count: 94,
              is_winner: true,
              position: 1,
              website_url: 'https://example.com'
            },
            {
              id: 202,
              name: 'LocalEats Finder',
              short_description: 'Discover authentic local restaurants and street food',
              logo_url: 'https://via.placeholder.com/60x60/F97316/FFFFFF?text=LE',
              vote_count: 81,
              is_winner: true,
              position: 2,
              website_url: 'https://example.com'
            },
            {
              id: 203,
              name: 'WeatherWise Travel',
              short_description: 'Weather-based travel planning and packing suggestions',
              logo_url: 'https://via.placeholder.com/60x60/84CC16/FFFFFF?text=WW',
              vote_count: 69,
              is_winner: true,
              position: 3,
              website_url: 'https://example.com'
            }
          ]
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getPositionBadge = (position) => {
    const badges = {
      1: { text: '🥇 Winner', className: 'bg-yellow-100 text-yellow-800' },
      2: { text: '🥈 Winner', className: 'bg-gray-100 text-gray-800' },
      3: { text: '🥉 Winner', className: 'bg-orange-100 text-orange-800' }
    }
    return badges[position] || null
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-16 bg-gray-200 rounded"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Past Launches</h1>
        <p className="text-lg text-gray-600">
          Explore previous launch weeks and discover winning travel apps
        </p>
      </div>

      {/* Past Launch Weeks */}
      <div className="space-y-8">
        {pastLaunches.map((launch, weekIndex) => (
          <Card key={weekIndex} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <CardTitle>
                    {new Date(launch.week_start).toLocaleDateString()} - {new Date(launch.week_end).toLocaleDateString()}
                  </CardTitle>
                </div>
                <Badge variant="secondary">
                  {launch.apps.length} Apps
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              <div className="divide-y divide-gray-200">
                {launch.apps.map((app, appIndex) => (
                  <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl font-bold text-gray-400 w-8">
                            #{app.position}
                          </span>
                          <img 
                            src={app.logo_url} 
                            alt={app.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{app.name}</h3>
                            {getPositionBadge(app.position) && (
                              <Badge className={getPositionBadge(app.position).className}>
                                {getPositionBadge(app.position).text}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm">{app.short_description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Trophy className="h-4 w-4" />
                            <span>{app.vote_count} votes</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Link to={`/app/${app.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                          <a 
                            href={app.website_url} 
                            target="_blank" 
                            rel={app.is_winner ? "dofollow" : "nofollow"}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Ready to Launch Your Travel App?</h2>
          <p className="text-blue-100 mb-6">
            Join our weekly launches and showcase your app to the travel tech community
          </p>
          <Link to="/submit">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Submit Your App
            </Button>
          </Link>
        </CardContent>
      </Card>

      {pastLaunches.length === 0 && !loading && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Past Launches Yet</h3>
            <p className="text-gray-600 mb-4">
              Past launch weeks will appear here once they're completed.
            </p>
            <Link to="/">
              <Button>View Current Launch</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

