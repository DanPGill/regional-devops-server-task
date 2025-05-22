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