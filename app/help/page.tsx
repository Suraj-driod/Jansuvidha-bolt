"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Phone, MessageSquare } from "lucide-react";

export default function HelpDesk() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center">
          <Button variant="outline" size="sm" asChild className="mr-2">
            <Link href="/">Home</Link>
          </Button>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-600">Help Desk</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Help Desk</h1>
          
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Mail className="h-8 w-8 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Email Support</h2>
              <p className="text-gray-600 mb-4">
                Send us an email and we'll respond within 24 hours.
              </p>
              <Button asChild>
                <a href="mailto:support@jansuvidha.com">Email Us</a>
              </Button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <Phone className="h-8 w-8 text-blue-600 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Phone Support</h2>
              <p className="text-gray-600 mb-4">
                Available Monday to Friday, 9:00 AM to 6:00 PM
              </p>
              <Button asChild>
                <a href="tel:+1234567890">Call Us</a>
              </Button>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6">Submit a Support Ticket</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Your email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issue Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>Technical Support</option>
                  <option>Account Issues</option>
                  <option>Report Problems</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={4}
                  placeholder="Describe your issue"
                />
              </div>
              
              <Button type="submit" className="w-full">
                Submit Ticket
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}