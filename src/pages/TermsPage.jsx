import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Scale, Shield, Eye, UserCheck } from 'lucide-react'

export function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
        <p className="text-lg text-gray-600">
          Last updated: June 19, 2025
        </p>
      </div>

      {/* Quick Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Scale className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">Fair Use</div>
            <div className="text-sm text-gray-600">Respectful platform usage</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">Privacy</div>
            <div className="text-sm text-gray-600">Your data is protected</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">Transparency</div>
            <div className="text-sm text-gray-600">Clear policies</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <UserCheck className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="font-semibold text-gray-900">Quality</div>
            <div className="text-sm text-gray-600">Curated submissions</div>
          </CardContent>
        </Card>
      </div>

      {/* Terms Content */}
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              By accessing and using TravelLaunch ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Platform Description</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              TravelLaunch is a platform for showcasing travel-related applications, services, and tools. We provide weekly launch cycles where apps compete for community votes and recognition.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. App Submission Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h4 className="font-semibold mb-2">Eligibility Requirements:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Apps must be travel-related (navigation, booking, planning, etc.)</li>
              <li>Must have a functional website or app store presence</li>
              <li>Content must be appropriate and family-friendly</li>
              <li>No spam, malware, or fraudulent applications</li>
            </ul>
            
            <h4 className="font-semibold mb-2 mt-4">Submission Process:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>All submissions undergo review before publication</li>
              <li>We reserve the right to reject submissions that don't meet our guidelines</li>
              <li>Paid submissions receive priority review and immediate publication</li>
              <li>Free submissions are limited to 15 per launch week</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Voting System</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-1">
              <li>One vote per IP address per app during the launch week</li>
              <li>Voting manipulation or fraud is strictly prohibited</li>
              <li>We reserve the right to remove fraudulent votes</li>
              <li>Vote counts are final at the end of each launch week</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Winner Benefits & Requirements</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <h4 className="font-semibold mb-2">Winner Benefits:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Dofollow link to your website (conditional)</li>
              <li>Downloadable winner badge</li>
              <li>Featured placement in past launches archive</li>
            </ul>
            
            <h4 className="font-semibold mb-2 mt-4">Badge Requirement:</h4>
            <p>
              To maintain dofollow link status, winners must embed the provided badge on their website. 
              Removal of the badge will result in the link reverting to nofollow status.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Paid Submissions</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-1">
              <li>Featured submissions cost $99 and bypass weekly limits</li>
              <li>Paid apps receive immediate dofollow links</li>
              <li>Payment is non-refundable once the app is published</li>
              <li>Paid submissions still must meet our content guidelines</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-1">
              <li>You retain all rights to your submitted content</li>
              <li>By submitting, you grant us license to display your content on our platform</li>
              <li>You warrant that you have the right to submit all provided content</li>
              <li>We respect intellectual property rights and will remove infringing content</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Privacy & Data</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <ul className="list-disc pl-6 space-y-1">
              <li>We collect minimal data necessary for platform operation</li>
              <li>Voting is tracked by IP address to prevent fraud</li>
              <li>We do not sell or share personal information with third parties</li>
              <li>Contact information is used only for platform communication</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Platform Modifications</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the platform at any time. 
              We will provide reasonable notice for significant changes that affect user experience.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              TravelLaunch is provided "as is" without warranties. We are not liable for any damages arising 
              from platform use, including but not limited to lost revenue, data, or business opportunities.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>11. Termination</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              We may terminate or suspend access to our platform immediately, without prior notice, 
              for conduct that we believe violates these terms or is harmful to other users.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>12. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p>
              For questions about these terms, please contact us at{' '}
              <a href="mailto:legal@travellaunch.com" className="text-blue-600 hover:underline">
                legal@travellaunch.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <Card className="bg-gray-50">
        <CardContent className="text-center py-6">
          <p className="text-sm text-gray-600">
            These terms are effective as of June 19, 2025. We may update these terms from time to time. 
            Continued use of the platform constitutes acceptance of any changes.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

