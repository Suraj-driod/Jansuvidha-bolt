"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertTriangle, Users, User, List, Settings, LogOut } from "lucide-react";
import { mockIssues } from "@/lib/mock-data";
import StatusBadge from "@/components/reports/StatusBadge";
import Logo from "@/components/layout/Logo";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("reports");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin login attempt with:", { email, password });
    // In a real app, this would connect to authentication service
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <Logo className="h-10 w-10 text-blue-600" />
              <span className="ml-2 text-2xl font-bold">JanSuvidha</span>
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Admin Portal</h2>
            <p className="mt-2 text-sm text-gray-600">
              Authorized personnel only
            </p>
          </div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  This is a restricted area. Unauthorized access is prohibited.
                </p>
              </div>
            </div>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full py-2 px-4"
              >
                Sign in to Admin Portal
              </Button>
            </div>
          </form>
          
          <div className="text-center mt-4">
            <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
              Return to public site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 text-white flex-shrink-0">
          <div className="flex items-center justify-center h-16 border-b border-gray-800">
            <Logo className="h-6 w-6 mr-2" />
            <span className="text-xl font-bold">Admin Panel</span>
          </div>
          <nav className="mt-6">
            <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main
            </div>
            <button
              className={`flex items-center px-6 py-3 w-full ${
                activeTab === "reports" ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("reports")}
            >
              <List className="h-5 w-5 mr-3" />
              <span>Reports Queue</span>
            </button>
            <button
              className={`flex items-center px-6 py-3 w-full ${
                activeTab === "flagged" ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("flagged")}
            >
              <AlertTriangle className="h-5 w-5 mr-3" />
              <span>Flagged Content</span>
            </button>
            <button
              className={`flex items-center px-6 py-3 w-full ${
                activeTab === "users" ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("users")}
            >
              <Users className="h-5 w-5 mr-3" />
              <span>User Management</span>
            </button>
            
            <div className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6">
              Account
            </div>
            <button
              className={`flex items-center px-6 py-3 w-full ${
                activeTab === "profile" ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="h-5 w-5 mr-3" />
              <span>Profile</span>
            </button>
            <button
              className={`flex items-center px-6 py-3 w-full ${
                activeTab === "settings" ? "bg-gray-800" : "hover:bg-gray-800"
              }`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-5 w-5 mr-3" />
              <span>Settings</span>
            </button>
            <button
              className="flex items-center px-6 py-3 w-full text-red-400 hover:bg-gray-800 mt-6"
              onClick={() => setIsLoggedIn(false)}
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow-sm z-10">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {activeTab === "reports" && "Reports Queue"}
                  {activeTab === "flagged" && "Flagged Content"}
                  {activeTab === "users" && "User Management"}
                  {activeTab === "profile" && "Profile"}
                  {activeTab === "settings" && "Settings"}
                </h1>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-4">Admin User</span>
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-sm font-medium">AU</span>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <main className="p-6">
            {activeTab === "reports" && (
              <div>
                <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium">Pending Reports</h2>
                    <p className="text-sm text-gray-600">
                      Review and process submitted reports
                    </p>
                  </div>
                  
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reported On
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockIssues.map((issue) => (
                        <tr key={issue.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            #{issue.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{issue.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{issue.description.substring(0, 50)}...</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{issue.location.street}</div>
                            <div className="text-sm text-gray-500">{issue.location.area}, {issue.location.city}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {issue.reportedOn}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={issue.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">View</Button>
                              <Button size="sm">Update Status</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="text-blue-800 font-medium mb-2">Admin Dashboard Notes</h3>
                  <p className="text-blue-700 text-sm">
                    This is a mock admin panel. In a real implementation, it would have full CRUD 
                    functionality for managing reports, users, and content moderation.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === "flagged" && (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Flagged Content</h2>
                <p className="text-gray-600">
                  This section would display comments and reports that have been flagged by users 
                  for inappropriate content or other issues.
                </p>
                <div className="mt-4 p-8 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No flagged content at this time</p>
                </div>
              </div>
            )}
            
            {activeTab === "users" && (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">User Management</h2>
                <p className="text-gray-600">
                  This section would provide tools for managing user accounts, permissions, and activity.
                </p>
                <div className="mt-4 p-8 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">User management features would be implemented here</p>
                </div>
              </div>
            )}
            
            {activeTab === "profile" && (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">Admin Profile</h2>
                <p className="text-gray-600">
                  Manage your admin account settings and profile information.
                </p>
                <div className="mt-4 p-8 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Profile management would be implemented here</p>
                </div>
              </div>
            )}
            
            {activeTab === "settings" && (
              <div className="bg-white shadow-sm rounded-lg p-6">
                <h2 className="text-lg font-medium mb-4">System Settings</h2>
                <p className="text-gray-600">
                  Configure global system settings and preferences.
                </p>
                <div className="mt-4 p-8 border border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">System settings would be implemented here</p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}