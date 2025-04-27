"use client";

import { Button } from "@/components/ui/button";
import ReportForm from "@/components/reports/ReportForm";
import Link from "next/link";

export default function NewReport() {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center">
          <Button variant="outline" size="sm" asChild className="mr-2">
            <Link href="/">Home</Link>
          </Button>
          <span className="text-gray-400 mx-1">/</span>
          <Button variant="outline" size="sm" asChild className="mr-2">
            <Link href="/reports">Reports</Link>
          </Button>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-600">New Report</span>
        </div>
        
        <ReportForm />
      </div>
    </div>
  );
}