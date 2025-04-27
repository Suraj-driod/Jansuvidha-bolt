import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <Hero />
      <StatsSection />
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reporting and tracking infrastructure issues in your community has never been easier.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-800 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit a Report</h3>
              <p className="text-gray-600 mb-4">
                Fill out a simple form with details about the issue and upload photos to provide visual evidence.
              </p>
              <Button variant="outline" asChild className="mt-2">
                <Link href="/reports/new">Report Now</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-800 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-600 mb-4">
                Monitor the status of your report through our transparent tracking system with real-time updates.
              </p>
              <Button variant="outline" asChild className="mt-2">
                <Link href="/reports/status">Track Status</Link>
              </Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-800 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Issue Resolved</h3>
              <p className="text-gray-600 mb-4">
                Once the issue is addressed, you'll receive a notification and can verify the resolution.
              </p>
              <Button variant="outline" asChild className="mt-2">
                <Link href="/community">View Success Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to improve your community?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of citizens who are making a difference by reporting infrastructure issues.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/reports/new">Report an Issue</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/map">View Map</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}