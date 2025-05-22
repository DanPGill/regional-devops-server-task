import { useEffect, useState } from "react";

import Status from "./status";
import ResponesTime from "./response-time";
import Connections from "./connections";
import RegionOverview from "./region-overview";
import SelectedRegion from "./selected-region";
import LoadingSpinnerWrapper from "@/components/core/loading-spinner";
import { EmptyState } from "@/components/empty-state";
import { connectWebSocket } from "@/lib/websocket";
import { RegionStatus } from "@/types/region-status";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const socket = new WebSocket(`${baseUrl.replace(/^http/, "ws")}/ws`);

const Dashboard = () => {
  const [statusData, setStatusData] = useState<RegionStatus[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>("us-east");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    connectWebSocket({
      socket,
      setStatusData,
      setConnected,
      setLoading,
      setError,
    });
  }, []);

  const selectedRegionData =
    statusData.find((r) => r.region === selectedRegion) || statusData[0];

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      {!statusData.length && !loading ? (
        <EmptyState />
      ) : (
        <>
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
                onClick={() =>
                  connectWebSocket({
                    socket,
                    setStatusData,
                    setConnected,
                    setLoading,
                    setError,
                  })
                }
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
                  <Status data={statusData} />
                  <ResponesTime data={statusData} />
                  <Connections data={statusData} />
                </div>
                <RegionOverview
                  data={statusData}
                  selectedRegion={selectedRegion}
                  onSelectRegion={setSelectedRegion}
                />
                <SelectedRegion selectedRegionData={selectedRegionData} />
              </>
            )}
          </LoadingSpinnerWrapper>
        </>
      )}
    </div>
  );
};

export default Dashboard;
