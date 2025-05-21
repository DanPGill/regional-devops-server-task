import WebSocket, { WebSocketServer } from "ws";
import fetch from "node-fetch";
const PORT = 8080;
const INTERVAL = 10000;
const regions = [
    "us-east",
    "eu-west",
    "eu-central",
    "us-west",
    "sa-east",
    "ap-southeast",
];
const getEndpointUrl = (region) => `https://data--${region}.upscope.io/status?stats=1`;
const wss = new WebSocketServer({ port: PORT });
const clients = new Set();
console.log(`WebSocket server started on ws://localhost:${PORT}`);
wss.on("connection", (ws) => {
    clients.add(ws);
    console.log("Client connected");
    ws.on("close", () => {
        clients.delete(ws);
        console.log("Client disconnected");
    });
});
const fetchRegionData = async () => {
    const results = {};
    await Promise.all(regions.map(async (region) => {
        try {
            const response = await fetch(getEndpointUrl(region));
            const data = await response.json();
            results[region] = data;
        }
        catch (error) {
            console.error(`Failed to fetch ${region}:`, error);
            results[region] = { error: "Failed to fetch data" };
        }
    }));
    return results;
};
const updateClientsWithStatusData = async () => {
    const data = await fetchRegionData();
    const message = JSON.stringify({ timestamp: Date.now(), data });
    for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    }
};
setInterval(updateClientsWithStatusData, INTERVAL);
