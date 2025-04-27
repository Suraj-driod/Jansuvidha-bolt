"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I report an infrastructure issue?",
    answer: "To report an issue, click on the 'Report Now' button from the homepage or navigation menu. Fill out the form with details about the issue, including location and photos if possible. Submit the form and you'll receive a tracking number for your report.",
    category: "Reporting"
  },
  {
    question: "How can I track the status of my report?",
    answer: "You can track your report status by visiting the 'Track Status' page and entering your report tracking number. You can also view all your submitted reports in your profile dashboard if you're logged in.",
    category: "Tracking"
  },
  {
    question: "What types of issues can I report?",
    answer: "You can report various infrastructure issues including potholes, street light outages, garbage collection problems, water logging, broken sidewalks, and other civic infrastructure concerns.",
    category: "Reporting"
  },
  {
    question: "How long does it take for an issue to be resolved?",
    answer: "Resolution time varies depending on the type and severity of the issue. Minor issues are typically addressed within 3-5 working days, while major issues may take longer. You can always check the current status of your report through our tracking system.",
    category: "Resolution"
  },
  {
    question: "Do I need to create an account to report an issue?",
    answer: "While you can submit reports without an account, we recommend creating one. This allows you to track all your reports, receive updates, and participate in community discussions.",
    category: "Account"
  },
  {
    question: "Can I upload photos with my report?",
    answer: "Yes, you can upload multiple photos with your report. Visual evidence helps authorities better understand and address the issue. Please ensure the photos clearly show the problem.",
    category: "Reporting"
  },
  {
    question: "How do I update or add information to my report?",
    answer: "If you need to update your report, log in to your account, find the report in your dashboard, and click on 'Update Report'. You can add new information or photos to existing reports.",
    category: "Reporting"
  },
  {
    question: "What happens after I submit a report?",
    answer: "After submission, your report is reviewed and assigned to the relevant department. You'll receive updates as the status changes, and you can track progress through our system.",
    category: "Process"
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<number[]>([]);

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center">
          <Button variant="outline" size="sm" asChild className="mr-2">
            <Link href="/">Home</Link>
          </Button>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-600">FAQ</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                size="sm"
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50"
                  onClick={() => toggleItem(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 py-4 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No FAQs found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}