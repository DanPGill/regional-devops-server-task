import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegionStatus } from "@/types/region-status";
import { CheckCircle, AlertTriangle } from "lucide-react";

type StatusProps = {
  data: RegionStatus[];
};

const Status: React.FC<StatusProps> = ({ data }) => {
  return (
    <Card className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <CardHeader className="mb-2">
        <h2 className="text-lg font-semibold text-gray-900">Overall Status</h2>
        <CardTitle>
          <p className="text-sm text-gray-500">System-wide health</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.every((region) => region.status === "ok") ? (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>All Systems Operational</span>
          </div>
        ) : (
          <div className="flex items-center text-amber-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span>Degraded Performance Detected</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Status;
