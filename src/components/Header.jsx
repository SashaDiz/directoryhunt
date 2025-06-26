import React from 'react'
import { Link } from 'react-router-dom'
import { Plane, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

// Placeholder for authentication state
const isAuthenticated = false; // Replace with real auth logic

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-900">
            <Plane className="h-6 w-6 text-blue-600" />
            <span>TravelLaunch</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/past-launches" className="text-gray-700 hover:text-blue-600 transition-colors">
              Past Launches
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-blue-600 transition-colors">
              FAQ
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Submit Button & Auth Buttons & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link to="/submit">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Submit App
                </Button>
            </Link>
            {!isAuthenticated && (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/signup">
                  <Button variant="outline">Sign Up</Button>
                </Link>
                <Link to="/signin">
                  <Button>Sign In</Button>
                </Link>
              </div>
            )}
            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/past-launches" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Past Launches
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-2 mt-2 border-t border-gray-200 space-y-2">
                  <Link to="/submit" onClick={() => setIsMenuOpen(false)}>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                      Submit App
                    </Button>
                  </Link>
                {!isAuthenticated && (
                  <>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">Sign Up</Button>
                    </Link>
                    <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full">Sign In</Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

