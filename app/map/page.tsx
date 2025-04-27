import { Button } from "@/components/ui/button";
import Link from "next/link";
import MapView from "@/components/map/MapView";

export default function Map() {
  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center">
          <Button variant="outline" size="sm" asChild className="mr-2">
            <Link href="/">Home</Link>
          </Button>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-600">Map View</span>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Map View</h1>
            <p className="text-gray-600">
              View and filter reported issues across the city
            </p>
          </div>
          
          <Button asChild>
            <Link href="/reports/new">Report New Issue</Link>
          </Button>
        </div>
        
        <MapView />
        
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
          <h3 className="font-medium mb-2">Map Legend</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-amber-500 mr-2"></div>
              <span>Pending Issues</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-blue-500 mr-2"></div>
              <span>In Progress</span>
            </div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-green-500 mr-2"></div>
              <span>Resolved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}