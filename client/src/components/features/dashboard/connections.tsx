import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { RegionStatus } from "./dashboard";

type ConnectionsProps = {
  data: RegionStatus[];
};

const Connections: React.FC<ConnectionsProps> = ({ data }) => {
  const totalConnections = data
    .reduce((acc, region) => {
      const connections = region.stats?.server?.active_connections;
      return typeof connections === "number" ? acc + connections : acc;
    }, 0)
    .toLocaleString();

  return (
    <Card className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <CardHeader className="mb-2">
        <h2 className="text-lg font-semibold text-gray-900">
          Active Connections
        </h2>
        <CardTitle>
          <p className="text-sm text-gray-500">Total across all regions</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {totalConnections}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-2" />
          <span>Across {data.length} regions</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Connections;
