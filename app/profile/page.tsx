"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Download, Loader2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { useForm } from "@/lib/context/FormContext";

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  username: "johndoe",
  dateJoined: "2025-01-15",
  avatar: "",
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);
  const { forms } = useForm();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Avatar file:", file);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Progress':
        return 'bg-purple-100 text-purple-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-100">
            <div className="flex items-center gap-8">
              <div className="relative">
                <Avatar className="h-28 w-28 ring-4 ring-primary/10">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback className="text-3xl bg-primary/5 text-primary">
                    {userData.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="avatar-upload" 
                  className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors shadow-md"
                >
                  <Camera className="h-4 w-4" />
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-1">{userData.name}</h1>
                <p className="text-gray-500">Member since {format(new Date(userData.dateJoined), "MMMM yyyy")}</p>
                <div className="flex gap-4 mt-4">
                  <Button asChild variant="outline" className="shadow-sm">
                    <Link href="/profile/settings">
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 mb-6 border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">Full Name</label>
                <p className="text-lg text-gray-900">{userData.name}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">Email Address</label>
                <p className="text-lg text-gray-900">{userData.email}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">Phone Number</label>
                <p className="text-lg text-gray-900">{userData.phone}</p>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-500">Username</label>
                <p className="text-lg text-gray-900">{userData.username}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">My Reports</h2>
              <Button variant="outline" size="sm" className="shadow-sm">
                <Download className="h-4 w-4 mr-2" />
                Export Reports
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Report Title</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Location</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {forms.map((report) => (
                    <tr 
                      key={report.id} 
                      className={`border-b border-gray-100 hover:bg-gray-50/50 transition-colors ${
                        report.isPreview ? 'bg-gray-50/30' : ''
                      }`}
                    >
                      <td className="py-4 px-4 text-gray-900">
                        {format(new Date(report.timestamp), "MMM d, yyyy")}
                      </td>
                      <td className="py-4 px-4 text-gray-900 font-medium">{report.title}</td>
                      <td className="py-4 px-4 text-gray-600">
                        {report.location.street}, {report.location.area}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusStyle(report.status)}`}>
                          {report.status === 'Processing' && (
                            <Loader2 className="h-3 w-3 animate-spin" />
                          )}
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Button variant="link" asChild className="text-primary hover:text-primary/80">
                          <Link href={`/reports/${report.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}