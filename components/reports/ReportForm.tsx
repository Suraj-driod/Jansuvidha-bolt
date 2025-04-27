"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { issueTypes, wardsList } from "@/lib/mock-data";
import { MapPin, Upload, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "@/lib/context/FormContext";
import { toast } from "sonner";
import LocationMap from "./LocationMap";

const ReportForm = () => {
  const router = useRouter();
  const { addForm } = useForm();
  const [formState, setFormState] = useState({
    issueType: "",
    description: "",
    street: "",
    area: "",
    city: "",
    landmark: "",
    ward: "",
    pinCode: "",
    postToCommunity: false,
    coordinates: {
      lat: 0,
      lng: 0
    }
  });

  const [files, setFiles] = useState<FileList | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormState((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormState(prev => ({
      ...prev,
      coordinates: { lat, lng }
    }));
  };

  const validateForm = () => {
    if (!formState.issueType) return "Please select an issue type";
    if (!formState.description) return "Please provide a description";
    if (!formState.street) return "Please provide a street address";
    if (!formState.area) return "Please provide an area";
    if (!formState.ward) return "Please select a ward";
    if (!formState.city) return "Please provide a city";
    if (!formState.pinCode) return "Please provide a pin code";
    if (formState.coordinates.lat === 0 && formState.coordinates.lng === 0) {
      return "Please select a location on the map";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedIssueType = issueTypes.find(t => t.id === formState.issueType);
      
      const formData = {
        title: selectedIssueType?.name || 'Unknown Issue',
        description: formState.description,
        issueType: formState.issueType,
        location: {
          street: formState.street,
          area: formState.area,
          city: formState.city,
          landmark: formState.landmark || undefined,
          ward: formState.ward,
          pinCode: formState.pinCode,
          coordinates: formState.coordinates,
        },
        photos: files ? Array.from(files).map(file => URL.createObjectURL(file)) : [],
        postToCommunity: formState.postToCommunity,
      };

      await addForm(formData);
      toast.success("Report submitted successfully!");
      router.push('/reports/status');
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-6">Report an Infrastructure Issue</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-1">
              Select Issue Type
            </label>
            <select
              id="issueType"
              name="issueType"
              value={formState.issueType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Select an issue --</option>
              {issueTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description of the Issue
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formState.description}
              onChange={handleInputChange}
              placeholder="Provide a detailed description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Location on Map
            </label>
            <LocationMap onLocationSelect={handleLocationSelect} />
          </div>

          <div>
            <label htmlFor="photos" className="block text-sm font-medium text-gray-700 mb-1">
              Upload Photos
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="photos"
                className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-400 mb-1" />
                  <p className="text-xs text-gray-500">
                    {files ? `${files.length} file(s) selected` : "Drag & drop photos or click to browse"}
                  </p>
                </div>
                <input
                  id="photos"
                  type="file"
                  name="photos"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200 mb-6">
            <div className="flex items-center mb-4">
              <MapPin className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-base font-medium">Location Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                  Street <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={formState.street}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                  Area <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="area"
                  name="area"
                  value={formState.area}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formState.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="landmark" className="block text-sm font-medium text-gray-700 mb-1">
                  Landmark (Max 60 characters)
                </label>
                <input
                  type="text"
                  id="landmark"
                  name="landmark"
                  value={formState.landmark}
                  onChange={handleInputChange}
                  maxLength={60}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="ward" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Ward <span className="text-red-500">*</span>
                </label>
                <select
                  id="ward"
                  name="ward"
                  value={formState.ward}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select</option>
                  {wardsList.map((ward) => (
                    <option key={ward.id} value={ward.id}>
                      Ward {ward.id}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="pinCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Pin Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="pinCode"
                  name="pinCode"
                  value={formState.pinCode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="postToCommunity"
              name="postToCommunity"
              checked={formState.postToCommunity}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="postToCommunity" className="text-sm text-gray-700">
              Post this issue to the community forum
            </label>
          </div>

          <div className="text-right">
            <Button 
              type="submit" 
              size="lg" 
              className="px-8 py-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;