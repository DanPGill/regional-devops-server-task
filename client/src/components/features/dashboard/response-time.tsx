import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { RegionStatus } from "./dashboard";

type ResponseTimeProps = {
  data: RegionStatus[];
};

const ResponseTime: React.FC<ResponseTimeProps> = ({ data }) => {
  const aboveThreshold = data.some(
    (r) =>
      typeof r.stats?.server?.wait_time === "number" &&
      r.stats?.server?.wait_time > 400,
  );

  const waitTimeRegions = data.filter(
    (r): r is RegionStatus & { stats: { server: { wait_time: number } } } =>
      typeof r.stats?.server?.wait_time === "number",
  );

  const averageWaitTime = waitTimeRegions.length
    ? Math.round(
        waitTimeRegions.reduce(
          (acc, region) => acc + region.stats.server.wait_time,
          0,
        ) / waitTimeRegions.length,
      )
    : 0;

  return (
    <Card className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <CardHeader className="mb-2">
        <h2 className="text-lg font-semibold text-gray-900">
          Average Response Time
        </h2>
        <CardTitle>
          <p className="text-sm text-gray-500">Across all regions</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {averageWaitTime}ms
        </div>
        <div
          className={`text-sm flex items-center ${
            aboveThreshold ? "text-amber-600" : "text-emerald-600"
          }`}
        >
          {aboveThreshold ? (
            <AlertTriangle className="h-5 w-5 mr-2" />
          ) : (
            <CheckCircle className="h-5 w-5 mr-2" />
          )}
          <span>
            {aboveThreshold
              ? "Above threshold in some regions"
              : "Within acceptable range"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseTime;
