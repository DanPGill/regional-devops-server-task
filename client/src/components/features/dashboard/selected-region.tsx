import { Tabs } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusColor } from "@/lib/utils";
import { BarChartIcon, ActivityIcon, SignalIcon } from "lucide-react";
import { RegionStatus } from "./dashboard";

type SelectRegionProps = {
  selectedRegionData: RegionStatus;
};

const SelectedRegion: React.FC<SelectRegionProps> = ({
  selectedRegionData,
}) => {
  const regionDetailsContent = (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {selectedRegionData?.region} Region Details
        </h2>
        <span className="text-sm text-gray-500">
          Last updated:{" "}
          {new Date(selectedRegionData?.timestamp).toLocaleString()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedRegionData?.stats?.server?.wait_time ?? "N/A"}ms
            </div>
            <p className="text-xs text-muted-foreground">
              {typeof selectedRegionData?.stats?.server?.wait_time !== "number"
                ? "N/A"
                : selectedRegionData.stats?.server?.wait_time < 100
                  ? "Excellent"
                  : selectedRegionData.stats?.server?.wait_time < 300
                    ? "Good"
                    : "Poor"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Connections
            </CardTitle>
            <SignalIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedRegionData?.stats?.server?.active_connections ?? "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Total connections currently active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
            <ActivityIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">
              {selectedRegionData?.status}
            </div>
            <div
              className="w-full h-2 rounded-full mt-2"
              style={{
                backgroundColor: getStatusColor(selectedRegionData?.status),
              }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const metricsContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
            CPU Usage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-900">
              <ActivityIcon className="h-4 w-4 text-muted-foreground mr-2" />
              Current Usage
            </div>
            <span className="font-medium text-gray-900">
              {selectedRegionData?.stats?.server?.cpu_load ?? "N/A"}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full" />
          <div className="grid grid-cols-3 text-xs text-muted-foreground">
            <div>Low</div>
            <div className="text-center">Medium</div>
            <div className="text-right">High</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Tabs
      defaultValue="details"
      className="mb-4"
      items={[
        {
          label: "Region Details",
          value: "details",
          content: regionDetailsContent,
        },
        {
          label: "Key Metrics",
          value: "metrics",
          content: metricsContent,
        },
      ]}
    />
  );
};

export default SelectedRegion;
