"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap, ZoomControl } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { MapPin, Maximize, Minimize, Loader2 } from "lucide-react";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LocationMapProps {
  onLocationSelect?: (lat: number, lng: number) => void;
  initialLocation?: [number, number];
}

function MapController({ center }: { center?: [number, number] }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 16);
    }
    // Force a refresh of the map size when it becomes visible
    setTimeout(() => {
      map.invalidateSize();
    }, 100);
  }, [center, map]);
  
  return null;
}

export default function LocationMap({ onLocationSelect, initialLocation }: LocationMapProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const defaultLocation: [number, number] = [19.0760, 72.8777]; // Mumbai coordinates

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation([lat, lng]);
    onLocationSelect?.(lat, lng);
  };

  const handleMarkerDrag = (e: L.DragEndEvent) => {
    const marker = e.target;
    const position = marker.getLatLng();
    setSelectedLocation([position.lat, position.lng]);
    onLocationSelect?.(position.lat, position.lng);
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setSelectedLocation([latitude, longitude]);
        onLocationSelect?.(latitude, longitude);
        toast.success("Location found!");
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
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const mapOptions = {
    zoomControl: false,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    dragging: true,
  };

  const renderMap = (expanded = false) => (
    <MapContainer
      center={selectedLocation || initialLocation || defaultLocation}
      zoom={13}
      className={`h-full w-full ${expanded ? 'rounded-lg' : ''}`}
      onClick={handleMapClick}
      {...mapOptions}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomleft" />
      <MapController center={selectedLocation || undefined} />
      {selectedLocation && (
        <Marker 
          position={selectedLocation} 
          icon={icon}
          draggable={true}
          eventHandlers={{
            dragend: handleMarkerDrag
          }}
        />
      )}
    </MapContainer>
  );

  return (
    <>
      {!isExpanded && (
        <div className="relative rounded-lg overflow-hidden h-[400px]">
          <div className="absolute inset-0">
            {renderMap()}
            <div className="absolute top-4 right-4 z-[1000]">
              <Button
                variant="default"
                size="icon"
                onClick={() => setIsExpanded(true)}
                className="bg-white hover:bg-gray-100 text-gray-800 shadow-md h-10 w-10 rounded-full"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute bottom-4 right-4 z-[1000]">
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
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl h-[80vh] relative">
            <div className="absolute top-4 right-4 z-[1000]">
              <Button
                variant="default"
                size="icon"
                onClick={() => setIsExpanded(false)}
                className="bg-white hover:bg-gray-100 text-gray-800 shadow-md h-10 w-10 rounded-full"
              >
                <Minimize className="h-5 w-5" />
              </Button>
            </div>
            {renderMap(true)}
            <div className="absolute bottom-4 right-4 z-[1000]">
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
          </div>
        </div>
      )}
    </>
  );
}