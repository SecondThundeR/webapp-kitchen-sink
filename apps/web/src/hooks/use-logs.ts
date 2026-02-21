import { useState } from "react";

export type Log = { timestamp: number; message: string };

export const useLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  const addLog = (msg: string) =>
    setLogs((prev) => [
      {
        timestamp: Date.now(),
        message: msg,
      },
      ...prev,
    ]);

  return [logs, addLog] as const;
};
