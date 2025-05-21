import { Card, CardHeader, CardTitle } from "../ui/card";
import { RegionStatus } from "./dashboard";
import { Cpu, Users, Wifi } from "lucide-react";
import { getStatusColor } from "@/lib/utils";

type RegionalStatusOverviewProps = {
  data: RegionStatus[];
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
};

const RegionalStatusOverview: React.FC<RegionalStatusOverviewProps> = ({
  data,
  onSelectRegion,
  selectedRegion,
}) => {
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "ok":
        return "#d1fae5";
      case "degraded":
        return "#fef3c7";
      default:
        return "#f3f4f6";
    }
  };

  return (
    <Card className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm mb-6">
      <CardHeader>
        <h2 className="text-xl font-semibold text-gray-900">
          Region Status Overview
        </h2>
        <CardTitle>
          <p className="text-sm text-gray-500">
            Click on a region to view detailed metrics
          </p>
        </CardTitle>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {data.map((region) => (
          <div
            key={region.region}
            className={`border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
              region.region === selectedRegion ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => onSelectRegion(region.region)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{region.region}</h3>
                <span
                  className="inline-block mt-1 px-2 py-1 text-xs font-medium rounded"
                  style={{
                    backgroundColor: getStatusBgColor(region.status),
                    color: getStatusColor(region.status),
                  }}
                >
                  {region.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div className="flex items-center space-x-2">
                <Cpu size={16} />
                <div>
                  <p className="text-gray-500">CPU Load</p>
                  <p className="font-medium text-gray-900">
                    {region.stats?.server?.cpu_load != null
                      ? `${region.stats.server.cpu_load}%`
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users size={16} />
                <div>
                  <p className="text-gray-500">Active Connections</p>
                  <p className="font-medium text-gray-900">
                    {region.stats?.server?.active_connections != null
                      ? region.stats.server.active_connections.toLocaleString()
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Wifi size={16} />
                <div>
                  <p className="text-gray-500">Average Wait Time</p>
                  <p className="font-medium text-gray-900">
                    {region.stats?.server?.wait_time != null
                      ? `${region.stats.server.wait_time} ms`
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RegionalStatusOverview;
