import { useState } from "react";

export type Log = { id: number; timestamp: number; message: string };

// Two logs can land in the same millisecond, so the timestamp is not usable as a
// React key. Ids only have to be unique, not per-hook-instance
let nextLogId = 0;

export const useLogs = () => {
  const [logs, setLogs] = useState<Log[]>([]);

  const addLog = (msg: string) =>
    setLogs((prev) => [
      {
        id: nextLogId++,
        timestamp: Date.now(),
        message: msg,
      },
      ...prev,
    ]);

  return [logs, addLog] as const;
};
