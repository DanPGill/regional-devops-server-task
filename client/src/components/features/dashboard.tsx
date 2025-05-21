import { useEffect, useState } from "react";
import LoadingSpinnerWrapper from "../core/loading-spinner";
import OverallStatusCard from "./overall-status-card";
import RegionResponsivenessCard from "./region-responsiveness-card";
import ActiveConnectionsCard from "./active-connections-card";
import RegionalStatusOverview from "./regional-status-overview";
import SelectedRegion from "./selected-region";

export type RegionStatus = {
  status: string;
  region: string;
  timestamp: string;
  stats?: {
    server?: {
      wait_time?: number;
      cpu_load?: number;
      active_connections?: number;
    };
  };
};

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const socket = new WebSocket(`${baseUrl.replace(/^http/, "ws")}/ws`);

const Dashboard = () => {
  const [statusData, setStatusData] = useState<RegionStatus[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("us-east");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  const connectWebSocket = () => {
    setLoading(true);
    setError(null);

    try {
      socket.onopen = () => {
        console.log("WebSocket connected");
        setConnected(true);
      };

      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log("Received data from server:", message);

          const formattedData: RegionStatus[] = Object.entries(
            message.data,
          ).map(([region, data]) => {
            const results = (data as any)?.results ?? {};
            return {
              region,
              status: results.status ?? "unknown",
              timestamp: results.timestamp ?? new Date().toISOString(),
              stats: results.stats ?? {},
            };
          });

          setStatusData(formattedData);
          setLoading(false);
        } catch (err) {
          console.error("Error parsing WebSocket message:", err);
          setError("Failed to parse server message");
        }
      };

      socket.onerror = (err) => {
        console.error("WebSocket error:", err);
        setError("WebSocket connection error");
        setLoading(false);
      };

      socket.onclose = () => {
        console.log("WebSocket disconnected");
        setConnected(false);
      };
    } catch (err) {
      console.error("WebSocket connection failed:", err);
      setError("WebSocket connection failed");
      setLoading(false);
    }
  };

  useEffect(() => {
    connectWebSocket();
  }, []);

  const selectedRegionData =
    statusData.find((r) => r.region === selectedRegion) || statusData[0];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            DevOps Monitoring Dashboard
          </h1>
          <p className="text-gray-500">
            Real-time status monitoring for all regions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={connectWebSocket}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: connected ? "#10b981" : "#ef4444" }}
            ></span>
            <span className="text-sm text-gray-600">
              {connected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>
      <LoadingSpinnerWrapper isLoading={loading}>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}
        {!error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <OverallStatusCard data={statusData} />
              <RegionResponsivenessCard data={statusData} />
              <ActiveConnectionsCard data={statusData} />
            </div>
            <RegionalStatusOverview
              data={statusData}
              selectedRegion={selectedRegion}
              onSelectRegion={setSelectedRegion}
            />
            <SelectedRegion selectedRegionData={selectedRegionData} />
          </>
        )}
      </LoadingSpinnerWrapper>
    </div>
  );
};

export default Dashboard;
