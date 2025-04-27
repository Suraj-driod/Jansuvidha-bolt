import { IconType } from "react-icons";
import { 
  Users, 
  Upload,
  CheckCircle,
  MapPin
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: "users" | "upload" | "check" | "map";
}

const StatCard = ({ title, value, icon }: StatCardProps) => {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users className="h-10 w-10 text-gray-700" />;
      case "upload":
        return <Upload className="h-10 w-10 text-gray-700" />;
      case "check":
        return <CheckCircle className="h-10 w-10 text-gray-700" />;
      case "map":
        return <MapPin className="h-10 w-10 text-gray-700" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-[#f8f9fa] rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm text-gray-600 font-medium">{title}</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className="p-2 bg-white rounded-lg shadow-sm">
          {getIcon()}
        </div>
      </div>
    </div>
  );
};

const StatsSection = () => {
  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Government reports" 
            value="100+" 
            icon="users"
          />
          <StatCard 
            title="Photos uploaded" 
            value="2GB+" 
            icon="upload"
          />
          <StatCard 
            title="Reports submitted" 
            value="200+" 
            icon="check"
          />
          <StatCard 
            title="Submit Reports" 
            value="Community" 
            icon="map"
          />
        </div>
      </div>
    </div>
  );
};

export default StatsSection;