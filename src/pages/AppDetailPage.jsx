import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  ThumbsUp,
  Calendar,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Placeholder for authentication state
const isAuthenticated = false; // Replace with AuthJS logic

export function AppDetailPage() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for development
  useEffect(() => {
    setTimeout(() => {
      setApp({
        id: parseInt(id),
        name: "TravelMate Navigator",
        short_description:
          "AI-powered travel planning with real-time updates and local insights",
        full_description:
          "TravelMate Navigator is a comprehensive travel planning application that leverages artificial intelligence to provide personalized travel recommendations, real-time updates, and local insights. Whether you're planning a weekend getaway or a month-long adventure, our app helps you discover hidden gems, find the best deals, and navigate like a local.\n\nKey features include:\n• AI-powered itinerary planning\n• Real-time flight and accommodation updates\n• Local insider recommendations\n• Offline maps and navigation\n• Multi-language support\n• Social sharing and collaboration tools",
        logo_url: "https://via.placeholder.com/120x120/3B82F6/FFFFFF?text=TM",
        screenshots: [
          "https://via.placeholder.com/400x600/3B82F6/FFFFFF?text=Screenshot+1",
          "https://via.placeholder.com/400x600/10B981/FFFFFF?text=Screenshot+2",
          "https://via.placeholder.com/400x600/F59E0B/FFFFFF?text=Screenshot+3",
        ],
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        website_url: "https://example.com",
        vote_count: 42,
        is_paid: false,
        is_winner: false,
        is_active: true,
        launch_week_start: "2025-06-16T00:00:00Z",
        created_at: "2025-06-16T10:30:00Z",
      });

      setLoading(false);
    }, 1000);
  }, [id]);

  const handleVote = () => {
    if (!isAuthenticated) {
      window.location.href = "/signin";
      return;
    }
    if (!hasVoted && app?.is_active) {
      setApp((prev) => ({ ...prev, vote_count: prev.vote_count + 1 }));
      setHasVoted(true);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">App Not Found</h1>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Launch
      </Link>

      {/* App Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={app.logo_url}
              alt={app.name}
              className="w-24 h-24 rounded-xl object-cover mx-auto md:mx-0"
            />

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{app.name}</h1>
                {app.is_paid && (
                  <Badge className="bg-purple-100 text-purple-800">
                    Featured
                  </Badge>
                )}
                {app.is_winner && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Winner
                  </Badge>
                )}
              </div>

              <p className="text-lg text-gray-600 mb-4">
                {app.short_description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="h-5 w-5 text-blue-600" />
                    <span className="font-semibold">
                      {app.vote_count} votes
                    </span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      Launched{" "}
                      {new Date(app.launch_week_start).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {app.is_active && (
                    <Button
                      onClick={handleVote}
                      disabled={hasVoted}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {hasVoted ? "Voted!" : "Vote"}
                    </Button>
                  )}

                  <a
                    href={app.website_url}
                    target="_blank"
                    rel={
                      app.is_paid || (app.is_winner && app.badge_embedded)
                        ? "dofollow"
                        : "nofollow"
                    }
                  >
                    <Button variant="outline">
                      <Globe className="h-4 w-4 mr-2" />
                      Visit Website
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Screenshots & Video */}
      {(app.screenshots?.length > 0 || app.video_url) && (
        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {app.video_url && (
                <div className="aspect-video">
                  <iframe
                    src={app.video_url}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              )}

              {app.screenshots?.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {app.screenshots.map((screenshot, index) => (
                    <img
                      key={index}
                      src={screenshot}
                      alt={`Screenshot ${index + 1}`}
                      className="rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>About {app.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {app.full_description.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
