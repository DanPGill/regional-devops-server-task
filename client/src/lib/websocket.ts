import { RegionStatus } from "@/components/features/dashboard/dashboard";

type WebSocketHandlers = {
  socket: WebSocket;
  setStatusData: (data: RegionStatus[]) => void;
  setConnected: (connected: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const connectWebSocket = ({
  socket,
  setLoading,
  setError,
  setConnected,
  setStatusData,
}: WebSocketHandlers) => {
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

        const formattedData: RegionStatus[] = Object.entries(message.data).map(
          ([region, data]) => {
            const results = (data as any)?.results ?? {};
            return {
              region,
              status: results.status ?? "unknown",
              timestamp: results.timestamp ?? new Date().toISOString(),
              stats: results.stats ?? {},
            };
          },
        );

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
