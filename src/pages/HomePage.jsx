import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Star, ExternalLink, TrendingUp, ThumbsUp, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Placeholder for authentication state
const isAuthenticated = false; // Replace with real auth logic

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
          logo_url: "/src/assets/ai-favi.png",
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
          logo_url: "/src/assets/ai-favi.png",
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
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 35,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com"
        },
        {
          id: 4,
          name: "TripBudget Manager",
          short_description: "Comprehensive travel expense tracking and budgeting",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 28,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com"
        },
        {
          id: 5,
          name: "WeatherWise Travel",
          short_description: "Weather-based travel planning and packing suggestions",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 19,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com"
        },
        {
          id: 6,
          name: "PackSmart",
          short_description: "Smart packing lists based on destination and weather",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 64,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com"
        },
        {
          id: 7,
          name: "CityGuide AI",
          short_description: "AI-powered city exploration and local recommendations",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 7,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com"
        },
        {
          id: 8,
          name: "HotelFinder Elite",
          short_description: "Premium hotel booking with exclusive member rates",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 3,
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

  // Handle voting (toggle)
  const handleVote = async (appId) => {
    if (!isAuthenticated) {
      window.location.href = '/signin';
      return;
    }
    setVotingLoading(prev => new Set([...prev, appId]))
    setApps(prevApps => {
      return prevApps.map(app => {
        if (app.id === appId) {
          const hasVoted = votedApps.has(appId);
          return {
            ...app,
            vote_count: hasVoted ? app.vote_count - 1 : app.vote_count + 1
          };
        }
        return app;
      });
    });
    setVotedApps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(appId)) {
        newSet.delete(appId);
      } else {
        newSet.add(appId);
      }
      return newSet;
    });
    setVotingLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(appId);
      return newSet;
    });
  };

  // Sort apps by vote_count descending
  const sortedApps = [...apps].sort((a, b) => b.vote_count - a.vote_count);

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
      <section className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col md:flex-row items-center md:items-start justify-between mb-6">
        <div className="flex-1 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">Current Launch Week</h2>
          <p className="text-gray-600 text-sm md:text-base">Time until voting ends</p>
        </div>
        <div className="flex gap-2 md:gap-4 mt-4 md:mt-0">
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-lg px-2 py-1 md:px-3 md:py-2">
              <div className="text-base md:text-lg font-bold">{timeRemaining.days}</div>
              <div className="text-[8px] md:text-xs">Days</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-lg px-2 py-1 md:px-3 md:py-2">
              <div className="text-base md:text-lg font-bold">{timeRemaining.hours}</div>
              <div className="text-[8px] md:text-xs">Hours</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-lg px-2 py-1 md:px-3 md:py-2">
              <div className="text-base md:text-lg font-bold">{timeRemaining.minutes}</div>
              <div className="text-[8px] md:text-xs">Minutes</div>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-blue-600 text-white rounded-lg px-2 py-1 md:px-3 md:py-2">
              <div className="text-base md:text-lg font-bold">{timeRemaining.seconds}</div>
              <div className="text-[8px] md:text-xs">Seconds</div>
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
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full bg-white rounded-xl shadow animate-pulse h-32" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedApps.map((app, index) => (
              <Link key={app.id} to={`/app/${app.id}`} className="block group">
                <div className="w-full bg-white rounded-xl shadow flex flex-row items-center p-4 group cursor-pointer transition hover:shadow-lg">
                  {/* Left: Logo, Name, Description */}
                  <div className="flex items-center flex-1 min-w-0 gap-4">
                    <img
                      src={app.logo_url}
                      alt={app.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate text-lg">{app.name}</h3>
                        {index < 3 && (
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold
                            ${index === 0 ? 'bg-yellow-400 text-yellow-900' : ''}
                            ${index === 1 ? 'bg-gray-300 text-gray-800' : ''}
                            ${index === 2 ? 'bg-amber-700 text-amber-100' : ''}
                          `}>
                            <Crown className={`h-4 w-4 mr-0.5 inline
                              ${index === 0 ? 'text-yellow-500' : ''}
                              ${index === 1 ? 'text-gray-400' : ''}
                              ${index === 2 ? 'text-amber-500' : ''}
                            `} />
                            {index === 0 && '1st'}
                            {index === 1 && '2nd'}
                            {index === 2 && '3rd'}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">{app.short_description}</p>
                    </div>
                  </div>
                  {/* Right: Buttons */}
                  <div className="flex flex-row items-center gap-2 ml-4">
                    <a
                      href={app.website_url}
                      target="_blank"
                      rel={(() => {
                        if (app.is_winner || app.is_paid) return 'dofollow';
                        return 'nofollow';
                      })()}
                      tabIndex={-1}
                      className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-2 py-2 text-gray-600 hover:bg-gray-100 transition"
                      onClick={e => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={e => { e.preventDefault(); handleVote(app.id); }}
                      disabled={votingLoading.has(app.id)}
                      className={`inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium shadow transition
                        ${votedApps.has(app.id)
                          ? 'bg-green-100 text-green-700 hover:bg-green-100 border border-green-200'
                          : 'bg-blue-600 text-white hover:bg-blue-700'}
                        ${votingLoading.has(app.id) ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${votingLoading.has(app.id) ? 'animate-pulse' : ''}`} />
                      <span>{app.vote_count}</span>
                    </button>
                  </div>
                </div>
              </Link>
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

