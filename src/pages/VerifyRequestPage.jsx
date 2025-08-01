import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function VerifyRequestPage() {
  return (
    <div className="max-w-md mx-auto py-12 text-center">
      <div className="bg-white p-8 rounded shadow">
        <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4">Check your email</h1>

        <p className="text-gray-600 mb-6">
          A sign in link has been sent to your email address.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          If you don't see the email, check your spam folder.
        </p>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link to="/signin">Try another email</Link>
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link to="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
