import type { Log } from "@/hooks/use-logs";
import { cn } from "@/lib/utils";

interface LogsViewerProps {
  logs: Log[];
  compact?: boolean;
}

export const LogsViewer = ({ logs, compact = false }: LogsViewerProps) => {
  return (
    <div
      className={cn(
        "h-32 overflow-y-auto border dark:border-0 dark:bg-black text-green-700 dark:text-green-400 p-2 text-xs font-mono rounded-md",
        {
          "h-20": compact,
        },
      )}
    >
      {logs.length === 0 && (
        <span className="opacity-60 dark:opacity-50">{"// Logs will appear here..."}</span>
      )}
      {logs.map(({ timestamp, message }) => (
        <div key={timestamp}>
          [{new Date().toLocaleTimeString()}] {message}
        </div>
      ))}
    </div>
  );
};
