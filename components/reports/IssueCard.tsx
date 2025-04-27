import StatusBadge from "./StatusBadge";
import { Issue } from "@/lib/mock-data";

interface IssueCardProps {
  issue: Issue;
}

const IssueCard = ({ issue }: IssueCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {issue.photos && issue.photos.length > 0 && (
        <div className="h-40 overflow-hidden">
          <img 
            src={issue.photos[0]} 
            alt={issue.title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium">{issue.title}</h3>
          <StatusBadge status={issue.status} />
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Reported on:</span> {issue.reportedOn}
          </p>
          
          {issue.resolvedOn && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Resolved:</span> {issue.resolvedOn}
            </p>
          )}
          
          <p className="text-gray-700">{issue.description}</p>
          
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Location:</span> {issue.location.street}, {issue.location.area}</p>
            {issue.location.landmark && (
              <p><span className="font-medium">Landmark:</span> {issue.location.landmark}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;