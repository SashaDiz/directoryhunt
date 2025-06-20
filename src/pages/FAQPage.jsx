import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { HelpCircle, Clock, Trophy, DollarSign, Star, Badge as BadgeIcon } from 'lucide-react'

export function FAQPage() {
  const faqs = [
    {
      question: "How does the weekly launch system work?",
      answer: "Every week (Monday to Sunday), up to 15 travel apps can participate in our launch. During this period, community members vote for their favorite apps. At the end of the week, the top 3 apps with the most votes become winners and receive special benefits."
    },
    {
      question: "What are the benefits of winning?",
      answer: "Winners receive: (1) A permanent dofollow link to their website, (2) A downloadable winner badge to display on their site, (3) Featured placement in our past launches archive. Note: The dofollow link is only active if you embed the winner badge on your website."
    },
    {
      question: "What is a paid/featured submission?",
      answer: "For $99, you can submit a featured app that bypasses the 15-app weekly limit and gets published immediately. Featured apps also receive a permanent dofollow link regardless of votes, and are highlighted with a 'Featured' badge."
    },
    {
      question: "Can I submit multiple apps?",
      answer: "Yes, you can submit multiple apps, but each app requires a separate submission. If you're submitting multiple apps for the same week and it's already full, consider using paid submissions or selecting different launch weeks."
    },
    {
      question: "What types of apps can I submit?",
      answer: "We accept all travel-related apps, services, and tools including: navigation apps, booking platforms, restaurant finders, travel planning tools, expense trackers, language apps, weather apps, and any other travel-focused solutions."
    },
    {
      question: "How does the voting system work?",
      answer: "Each visitor can vote once per app during the active launch week. Voting is based on IP address to prevent multiple votes from the same user. Votes are counted in real-time and determine the weekly winners."
    },
    {
      question: "What about the dofollow/nofollow links?",
      answer: "During the launch week, all app links are 'nofollow'. After the week ends: (1) Paid apps always get dofollow links, (2) Winners get dofollow links only if they embed our winner badge, (3) All other apps keep nofollow links."
    },
    {
      question: "How do I embed the winner badge?",
      answer: "If your app wins, we'll provide you with HTML embed code and the badge image. Simply add this code to your website (preferably on your homepage or about page) to activate your dofollow link status."
    },
    {
      question: "Can I edit my submission after submitting?",
      answer: "Currently, you cannot edit submissions after they're published. Please review all information carefully before submitting. If you need to make changes, contact us and we'll help you update the information."
    },
    {
      question: "When will my app go live?",
      answer: "Free submissions go live at the start of their selected launch week (Monday 12:00 AM UTC). Paid submissions are published immediately after approval, which typically takes 1-2 business days."
    },
    {
      question: "What if a launch week is full?",
      answer: "If your preferred week has reached the 15-app limit, you can: (1) Choose a different week with available slots, (2) Upgrade to a paid submission to bypass the limit, or (3) Wait for potential cancellations (rare)."
    },
    {
      question: "How do you ensure quality submissions?",
      answer: "All submissions go through a brief review process to ensure they're legitimate travel-related apps with working websites. We check for spam, inappropriate content, and basic functionality before publishing."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">
          Everything you need to know about TravelLaunch
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">7</div>
            <div className="text-sm text-gray-600">Days per Launch</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <BadgeIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">15</div>
            <div className="text-sm text-gray-600">Max Apps per Week</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">3</div>
            <div className="text-sm text-gray-600">Winners per Week</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">$99</div>
            <div className="text-sm text-gray-600">Featured Submission</div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-start space-x-3 text-lg">
                <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>{faq.question}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed pl-8">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact CTA */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="text-center py-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? We're here to help!
          </p>
          <a 
            href="mailto:hello@travellaunch.com"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Support
          </a>
        </CardContent>
      </Card>
    </div>
  )
}

