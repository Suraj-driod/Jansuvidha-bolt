"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import IssueCard from "@/components/reports/IssueCard";
import { useForm } from "@/lib/context/FormContext";

const exampleReports = [
  {
    id: "status-1",
    title: "Broken Street Light on Hill Road",
    description: "Street light has been non-functional for the past week, creating safety concerns for pedestrians at night.",
    status: "Pending",
    timestamp: new Date().toISOString(),
    location: {
      street: "Hill Road",
      area: "Bandra West",
      city: "Mumbai",
      ward: "Ward 1",
      pinCode: "400050",
      landmark: "Near Bandra Station",
      coordinates: { lat: 19.0543, lng: 72.8254 }
    },
    photos: ["https://images.pexels.com/photos/691412/pexels-photo-691412.jpeg"],
    issueType: "streetlight"
  },
  {
    id: "status-2",
    title: "Pothole Near Market Area",
    description: "Large pothole causing traffic and potential vehicle damage. Needs immediate attention.",
    status: "Progress",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    location: {
      street: "Market Road",
      area: "Andheri West",
      city: "Mumbai",
      ward: "Ward 2",
      pinCode: "400053",
      landmark: "Near Andheri Market",
      coordinates: { lat: 19.1201, lng: 72.8446 }
    },
    photos: ["https://images.pexels.com/photos/2369465/pexels-photo-2369465.jpeg"],
    issueType: "pothole"
  },
  {
    id: "status-3",
    title: "Water Logging Issue",
    description: "Persistent water logging after light rain. Drainage system needs maintenance.",
    status: "Resolved",
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    location: {
      street: "SV Road",
      area: "Goregaon",
      city: "Mumbai",
      ward: "Ward 3",
      pinCode: "400062",
      landmark: "Near Goregaon Station",
      coordinates: { lat: 19.1663, lng: 72.8526 }
    },
    photos: ["https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg"],
    issueType: "drainage"
  }
];

export default function Status() {
  const { forms } = useForm();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  // Combine example reports with forms from context
  const allReports = [...exampleReports, ...forms];

  const filteredReports = allReports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !filterStatus || report.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Format reports to match IssueCard requirements
  const formattedReports = filteredReports.map(report => ({
    ...report,
    reportedOn: new Date(report.timestamp).toLocaleDateString(),
    votes: {
      upvotes: 0,
      downvotes: 0
    },
    comments: [],
    status: report.status as 'Pending' | 'Progress' | 'Resolved',
    location: {
      street: report.location.street,
      area: report.location.area,
      city: report.location.city,
      coordinates: report.location.coordinates,
      ward: report.location.ward || '',
      pinCode: report.location.pinCode || '',
      landmark: report.location.landmark || undefined
    }
  }));

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center">
          <Button variant="outline" size="sm" asChild className="mr-2">
            <Link href="/">Home</Link>
          </Button>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-600">Report Status</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Track Report Status</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search reports..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filterStatus === null ? "default" : "outline"}
                onClick={() => setFilterStatus(null)}
              >
                All
              </Button>
              <Button 
                variant={filterStatus === "Pending" ? "default" : "outline"}
                onClick={() => setFilterStatus("Pending")}
                className={filterStatus === "Pending" ? "" : "bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200"}
              >
                Pending
              </Button>
              <Button 
                variant={filterStatus === "Progress" ? "default" : "outline"}
                onClick={() => setFilterStatus("Progress")}
                className={filterStatus === "Progress" ? "" : "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200"}
              >
                In Progress
              </Button>
              <Button 
                variant={filterStatus === "Resolved" ? "default" : "outline"}
                onClick={() => setFilterStatus("Resolved")}
                className={filterStatus === "Resolved" ? "" : "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"}
              >
                Resolved
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formattedReports.length > 0 ? (
            formattedReports.map(report => (
              <IssueCard key={report.id} issue={report} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <h3 className="text-xl font-medium text-gray-700 mb-2">No reports found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
              <Button asChild>
                <Link href="/reports/new">Report a New Issue</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}