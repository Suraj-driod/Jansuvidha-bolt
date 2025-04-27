"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Filter, MapPin, Plus, Minus, Maximize, Loader2 } from "lucide-react";
import { mockIssues } from "@/lib/mock-data";
import dynamic from "next/dynamic";
import { toast } from "sonner";

declare let L: any;

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Tooltip = dynamic(
  () => import("react-leaflet").then((mod) => mod.Tooltip),
  { ssr: false }
);

// Demo nearby issues
const demoIssues = [
  {
    id: 'demo1',
    type: 'pothole',
    title: 'Large Pothole',
    status: 'Pending',
    location: { lat: 0, lng: 0 }
  },
  {
    id: 'demo2',
    type: 'streetlight',
    title: 'Broken Street Light',
    status: 'Progress',
    location: { lat: 0, lng: 0 }
  },
  {
    id: 'demo3',
    type: 'drainage',
    title: 'Blocked Drain',
    status: 'Pending',
    location: { lat: 0, lng: 0 }
  }
];

const getRandomOffset = () => {
  return (Math.random() - 0.5) * 0.02;
};

const MapView = () => {
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [isMounted, setIsMounted] = useState(false);
  const [map, setMap] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [nearbyIssues, setNearbyIssues] = useState(demoIssues);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined" && (window as any).L) {
      setLeafletLoaded(true);
    }
  }, []);

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };

  const handleGetLocation = () => {
    if (!map) return;
    
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    const geolocationOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation: [number, number] = [latitude, longitude];
        
        setSelectedLocation(newLocation);
        setUserLocation(newLocation);
        map.setView(newLocation, 16);
        
        const updatedIssues = demoIssues.map(issue => ({
          ...issue,
          location: {
            lat: latitude + getRandomOffset(),
            lng: longitude + getRandomOffset()
          }
        }));
        setNearbyIssues(updatedIssues);
        
        toast.success("Location selected successfully!");
        setIsLocating(false);
      },
      (error) => {
        let message = "Failed to get your location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Please allow location access to use this feature";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            message = "Location request timed out";
            break;
        }
        toast.error(message);
        setIsLocating(false);
      },
      geolocationOptions
    );
  };

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation([lat, lng]);
    toast.success("Location selected!");
  };

  const getMarkerIcon = (type: string) => {
    if (!leafletLoaded) return null;
    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="marker-pin ${type}"></div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42]
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-amber-500';
      case 'Progress': return 'bg-blue-500';
      case 'Resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isMounted) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-[calc(100vh-200px)] min-h-[500px] flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden h-[calc(100vh-200px)] min-h-[500px] relative">
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-white p-2 rounded-md shadow-md">
          <div className="flex items-center mb-2">
            <Filter className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Filter by Status</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant={filterStatus === "all" ? "default" : "outline"} 
              onClick={() => handleFilterChange("all")} 
              className="text-xs py-1 h-7"
            >
              All
            </Button>
            <Button 
              size="sm" 
              variant={filterStatus === "Pending" ? "default" : "outline"} 
              onClick={() => handleFilterChange("Pending")} 
              className="text-xs py-1 h-7 bg-amber-100 text-amber-800 hover:bg-amber-200 hover:text-amber-900 border-amber-200"
            >
              Pending
            </Button>
            <Button 
              size="sm" 
              variant={filterStatus === "Progress" ? "default" : "outline"} 
              onClick={() => handleFilterChange("Progress")} 
              className="text-xs py-1 h-7 bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900 border-blue-200"
            >
              In Progress
            </Button>
            <Button 
              size="sm" 
              variant={filterStatus === "Resolved" ? "default" : "outline"} 
              onClick={() => handleFilterChange("Resolved")} 
              className="text-xs py-1 h-7 bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 border-green-200"
            >
              Resolved
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-10">
        <Button
          variant="default"
          size="icon"
          onClick={handleGetLocation}
          disabled={isLocating}
          className="bg-white hover:bg-gray-100 text-gray-800 shadow-md h-10 w-10 rounded-full"
        >
          {isLocating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <MapPin className="h-5 w-5" />
          )}
        </Button>
      </div>

      <MapContainer
        center={[19.0760, 72.8777]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={setMap}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {leafletLoaded && mockIssues
          .filter(issue => filterStatus === "all" || issue.status === filterStatus)
          .map(issue => (
            <Marker
              key={issue.id}
              position={[issue.location.coordinates.lat, issue.location.coordinates.lng]}
              icon={getMarkerIcon(issue.title.toLowerCase().replace(/\s+/g, '-'))}
            >
              <Tooltip permanent>
                <div className="text-sm font-medium">{issue.title}</div>
                <div className={`text-xs px-1.5 py-0.5 rounded-full inline-block mt-1 ${getStatusColor(issue.status)} text-white`}>
                  {issue.status}
                </div>
              </Tooltip>
              <Popup>
                <div className="p-2">
                  <h3 className="font-medium text-lg">{issue.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                    issue.status === 'Pending' 
                      ? 'bg-amber-100 text-amber-800' 
                      : issue.status === 'Progress' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                  }`}>
                    {issue.status}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}

        {userLocation && leafletLoaded && nearbyIssues.map(issue => (
          <Marker
            key={issue.id}
            position={[issue.location.lat, issue.location.lng]}
            icon={getMarkerIcon(issue.type)}
          >
            <Tooltip permanent>
              <div className="text-sm font-medium">{issue.title}</div>
              <div className={`text-xs px-1.5 py-0.5 rounded-full inline-block mt-1 ${getStatusColor(issue.status)} text-white`}>
                {issue.status}
              </div>
            </Tooltip>
          </Marker>
        ))}

        {selectedLocation && leafletLoaded && (
          <Marker 
            position={selectedLocation}
            icon={L.divIcon({
              className: 'selected-location-marker',
              html: '<div class="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-lg"></div>',
              iconSize: [24, 24],
              iconAnchor: [12, 12]
            })}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium">Selected Location</h3>
                <p className="text-sm text-gray-600">
                  Lat: {selectedLocation[0].toFixed(6)}<br />
                  Lng: {selectedLocation[1].toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapView;