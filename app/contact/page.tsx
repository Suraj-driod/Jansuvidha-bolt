"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center">
          <Button variant="outline" size="sm" asChild className="mr-2">
            <Link href="/">Home</Link>
          </Button>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-600">Contact Us</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
          
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">Email</h2>
              <p className="text-gray-600">
                info@jansuvidha.com<br />
                support@jansuvidha.com
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">Phone</h2>
              <p className="text-gray-600">
                +91 123 456 7890<br />
                +91 098 765 4321
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center">
              <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">Address</h2>
              <p className="text-gray-600">
                123 Main Street<br />
                Mumbai, Maharashtra 400001
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Message subject"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={6}
                  placeholder="Your message"
                />
              </div>
              
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}