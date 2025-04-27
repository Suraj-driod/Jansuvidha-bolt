import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center">
          <Button variant="outline" size="sm" asChild className="mr-2">
            <Link href="/">Home</Link>
          </Button>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-600">Terms & Conditions</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-6">
                By accessing and using the Jansuvidha platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.
              </p>

              <h2 className="text-xl font-semibold mb-4">2. User Responsibilities</h2>
              <p className="text-gray-600 mb-6">
                Users are responsible for maintaining the confidentiality of their account information and for all activities under their account. Users must provide accurate and truthful information when submitting reports.
              </p>

              <h2 className="text-xl font-semibold mb-4">3. Report Submission Guidelines</h2>
              <p className="text-gray-600 mb-2">
                When submitting reports, users must:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-600">
                <li>Provide accurate location information</li>
                <li>Upload clear and relevant photos</li>
                <li>Avoid submitting duplicate reports</li>
                <li>Respect privacy and avoid including personal information</li>
              </ul>

              <h2 className="text-xl font-semibold mb-4">4. Privacy and Data Protection</h2>
              <p className="text-gray-600 mb-6">
                We are committed to protecting your privacy. Your personal information will be handled in accordance with our Privacy Policy.
              </p>

              <h2 className="text-xl font-semibold mb-4">5. Content Ownership</h2>
              <p className="text-gray-600 mb-6">
                Users retain ownership of content they submit. By submitting content, users grant Jansuvidha a non-exclusive license to use, modify, and display the content for service-related purposes.
              </p>

              <h2 className="text-xl font-semibold mb-4">6. Service Modifications</h2>
              <p className="text-gray-600 mb-6">
                We reserve the right to modify or discontinue any part of our service at any time. We will provide notice of significant changes when possible.
              </p>

              <h2 className="text-xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-600 mb-6">
                Jansuvidha is not liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>

              <h2 className="text-xl font-semibold mb-4">8. Contact Information</h2>
              <p className="text-gray-600">
                For questions about these Terms and Conditions, please contact us at legal@jansuvidha.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}