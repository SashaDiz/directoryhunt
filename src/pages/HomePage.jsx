import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Star, ExternalLink, TrendingUp, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GuidePromoCard from "@/components/ui/GuidePromoCard";
import SponsorCard from "@/components/ui/SponsorCard";

// Placeholder for authentication state
const isAuthenticated = false; // Replace with real auth logic

export function HomePage() {
  const [apps, setApps] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [loading, setLoading] = useState(true);
  const [votedApps, setVotedApps] = useState(new Set());
  const [votingLoading, setVotingLoading] = useState(new Set());

  // Mock data for development
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApps([
        {
          id: 1,
          name: "TravelMate Navigator",
          short_description:
            "AI-powered travel planning with real-time updates and local insights",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 42,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com",
        },
        {
          id: 2,
          name: "StayFinder Pro",
          short_description:
            "Find and book unique accommodations worldwide with instant confirmation",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 38,
          is_paid: true,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com",
        },
        {
          id: 3,
          name: "LocalEats Discovery",
          short_description:
            "Discover authentic local restaurants and hidden culinary gems",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 35,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com",
        },
        {
          id: 4,
          name: "TripBudget Manager",
          short_description:
            "Comprehensive travel expense tracking and budgeting",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 28,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com",
        },
        {
          id: 5,
          name: "WeatherWise Travel",
          short_description:
            "Weather-based travel planning and packing suggestions",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 19,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com",
        },
        {
          id: 6,
          name: "PackSmart",
          short_description:
            "Smart packing lists based on destination and weather",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 64,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com",
        },
        {
          id: 7,
          name: "CityGuide AI",
          short_description:
            "AI-powered city exploration and local recommendations",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 7,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com",
        },
        {
          id: 8,
          name: "HotelFinder Elite",
          short_description:
            "Premium hotel booking with exclusive member rates",
          logo_url: "/src/assets/ai-favi.png",
          vote_count: 3,
          is_paid: false,
          is_winner: false,
          is_active: true,
          website_url: "https://example.com",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const nextMonday = new Date();
      nextMonday.setDate(now.getDate() + ((7 - now.getDay() + 1) % 7 || 7));
      nextMonday.setHours(0, 0, 0, 0);

      const diff = nextMonday - now;

      if (diff > 0) {
        setTimeRemaining({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle voting (toggle)
  const handleVote = async (appId) => {
    if (!isAuthenticated) {
      window.location.href = "/signin";
      return;
    }
    setVotingLoading((prev) => new Set([...prev, appId]));
    setApps((prevApps) => {
      return prevApps.map((app) => {
        if (app.id === appId) {
          const hasVoted = votedApps.has(appId);
          return {
            ...app,
            vote_count: hasVoted ? app.vote_count - 1 : app.vote_count + 1,
          };
        }
        return app;
      });
    });
    setVotedApps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(appId)) {
        newSet.delete(appId);
      } else {
        newSet.add(appId);
      }
      return newSet;
    });
    setVotingLoading((prev) => {
      const newSet = new Set(prev);
      newSet.delete(appId);
      return newSet;
    });
  };

  // Sort apps by vote_count descending
  const sortedApps = [...apps].sort((a, b) => b.vote_count - a.vote_count);

  function pad(num) {
    return num.toString().padStart(2, "0");
  }

  return (
    <div className="flex flex-col items-start md:flex-row gap-10 space-y-0">
      <div className="left-side w-full md:flex-1">
        {/* Hero Section */}
        <section className="text-center pt-8 pb-8 max-w-2xl mr-auto">
          <h1 className="text-6xl font-medium text-gray-900 mb-6 text-left">
            Launch Your Directory &amp;&nbsp;Get a&nbsp;DR22 Backlink
          </h1>
          <p className="text-xl font-normal text-gray-900 text-left mb-8 max-w-xl">
            Submit your project and get a&nbsp;DR22&nbsp;backlink, early
            exposure, and reach other builders launching curated directories.
          </p>
        </section>

        {/* Current Launch Apps */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-medium text-gray-900 capitalize">
              Best weekly products
            </h2>
            <Badge variant="secondary" className="text-base">
              {apps.length} / 15 Apps
            </Badge>
          </div>

          {/* Countdown Timer */}
          <div className="bg-gray-100 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 text-left">
              <h2 className="text-lg font-medium text-gray-900 mb-1">
                New launches in
              </h2>
              <p className="text-gray-800 text-sm">
                Top 3 weekly and monthly products win badges and get dofollow
                backlinks.{" "}
                <Link
                  to="/details"
                  className="font-semibold underline underline-offset-4"
                >
                  More details.
                </Link>
              </p>
            </div>
            <div className="flex mt-4 md:mt-0">
              <div className="text-center">
                <div className=" text-gray-900 px-1">
                  <div className="text-xl font-medium">
                    {pad(timeRemaining.days)} :
                  </div>
                  <div className="text-[8px] md:text-xs">days</div>
                </div>
              </div>
              <div className="text-center">
                <div className=" text-gray-900 px-1">
                  <div className="text-xl font-medium">
                    {pad(timeRemaining.hours)} :
                  </div>
                  <div className="text-[8px] md:text-xs">hours</div>
                </div>
              </div>
              <div className="text-center">
                <div className=" text-gray-900 px-1">
                  <div className="text-xl font-medium">
                    {pad(timeRemaining.minutes)} :
                  </div>
                  <div className="text-[8px] md:text-xs">mins</div>
                </div>
              </div>
              <div className="text-center">
                <div className=" text-gray-900 px-1">
                  <div className="text-xl font-medium">
                    {pad(timeRemaining.seconds)}
                  </div>
                  <div className="text-[8px] md:text-xs">secs</div>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-full bg-white rounded-xl shadow animate-pulse h-32"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedApps.map((app, index) => (
                <Link
                  key={app.id}
                  to={`/app/${app.id}`}
                  className="block group"
                >
                  <div
                    className={`w-full bg-white rounded-xl border flex flex-row items-center p-4 group cursor-pointer transition duration-300 ease-in-out hover:border-gray-900 hover:shadow-[0_6px_0_rgba(0,0,0,1)] hover:-translate-y-1.5 
                      ${index === 0 ? "border-gray-900" : ""}
                            ${index === 1 ? "border-gray-600" : ""}
                            ${index === 2 ? "border-gray-400" : ""}`}
                  >
                    {/* Left: Logo, Name, Description */}
                    <div className="flex items-center flex-1 min-w-0 gap-4">
                      <img
                        src={app.logo_url}
                        alt={app.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 truncate text-lg">
                            {app.name}
                          </h3>
                          {index < 3 && (
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-xs font-normal
                            ${index === 0 ? "bg-gray-900 text-white" : ""}
                            ${index === 1 ? "bg-gray-300 text-gray-900" : ""}
                            ${index === 2 ? "bg-gray-200 text-gray-900" : ""}
                          `}
                            >
                              <img
                                src="/src/assets/crown.svg"
                                alt="Badge"
                                className={`w-4 mr-0.5
                              ${index === 0 ? "inline" : ""}
                              ${index === 1 ? "hidden" : ""}
                              ${index === 2 ? "hidden" : ""}
                            `}
                              />

                              <img
                                src="/src/assets/crown-black.svg"
                                alt="Badge"
                                className={`w-4 mr-0.5
                              ${index === 0 ? "hidden" : ""}
                              ${index === 1 ? "inline" : ""}
                              ${index === 2 ? "inline" : ""}
                            `}
                              />

                              {index === 0 && "1st"}
                              {index === 1 && "2nd"}
                              {index === 2 && "3rd"}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-800 line-clamp-2 mt-1">
                          {app.short_description}
                        </p>
                      </div>
                    </div>
                    {/* Right: Buttons */}
                    <div className="flex flex-row items-center gap-4 ml-4">
                      <a
                        href={app.website_url}
                        target="_blank"
                        rel={(() => {
                          if (app.is_winner || app.is_paid) return "dofollow";
                          return "nofollow";
                        })()}
                        tabIndex={-1}
                        className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-gray-50 px-2 py-2 text-gray-600 hover:bg-gray-100 transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleVote(app.id);
                        }}
                        disabled={votingLoading.has(app.id)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg min-w-20 text-md font-semibold transition duration-300 ease-in-out -translate-y-0.5
                        ${
                          votedApps.has(app.id)
                            ? "bg-gray-900 text-white translate-0"
                            : "bg-white text-black shadow-[0_4px_0_rgba(0,0,0,1)] border-2 border-gray-900 hover:shadow-[0_2px_0_rgba(0,0,0,1)] hover:translate-y-0"
                        }
                        ${
                          votingLoading.has(app.id)
                            ? "opacity-50 cursor-default"
                            : "cursor-pointer"
                        }`}
                      >
                        <ThumbsUp
                          className={`h-4.5 w-4.5 ${
                            votingLoading.has(app.id) ? "animate-pulse" : ""
                          }`}
                        />
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Apps This Week
                </h3>
                <p className="text-gray-600 mb-4">
                  Be the first to submit your travel app for this launch week!
                </p>
                <Link to="/submit">
                  <Button>Submit Your App</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </section>

        {/* How It Works */}
        {/* <section className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Submit Your App
              </h3>
              <p className="text-gray-600">
                Submit your travel-related app with details, screenshots, and
                choose your launch week.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Votes</h3>
              <p className="text-gray-600">
                Community members vote for their favorite apps during the weekly
                launch period.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Win & Get Featured
              </h3>
              <p className="text-gray-600">
                Top 3 apps become winners and receive permanent dofollow links
                and winner badges.
              </p>
            </div>
          </div>
        </section> */}
      </div>

      <div className="right-side w-full md:max-w-96 md:w-full md:sticky md:top-16 mt-10 md:mt-0">
        <aside className="space-y-8 py-8 md:py-8">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-md font-medium text-gray-900 uppercase">
              Directory guide
            </h2>
            <GuidePromoCard
              imageSrc="/src/assets/john.svg"
              name="John Rush"
              subtitle="Creator of MarsX (uniting AI, NoCode, and Code)"
              title="Want to build your own directory?"
              description="I'll teach you everything I learned the hard way over the years of building one of the most successful directories on the internet."
              buttonText="Get Directory Guide Now"
              buttonLink="https://johnrush.me/directory-guide/"
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-md font-medium text-gray-900 uppercase">
              Our partners
            </h2>
            <div className="flex flex-col gap-4 w-full">
              <SponsorCard
                sponsor={{
                  logo: "/src/assets/backlinkslist-logo.png",
                  name: "Backlinks List",
                  description:
                    "One platform for Stripe payments, auth, CRM, email + help desk. Perfect for SaaS + memberships. Try free.",
                  url: "https://backlinkslist.com",
                }}
              />
              <SponsorCard />
            </div>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://frogdr.com/directoryhunt.org?utm_source=directoryhunt.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://frogdr.com/directoryhunt.org/badge-white.svg"
                alt="Monitor your Domain Rating with FrogDR"
                className="w-full h-auto"
              />
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
