"use client";

import { useSessionContext } from "@/contexts/session-provider";

const SessionViewer: React.FC = () => {
  const { session, isLoading } = useSessionContext();

  return (
    <div className="dark:bg-background flex flex-col rounded-md bg-gray-100">
      <div className="dark:bg-background rounded-t-md bg-gray-200 p-4 font-bold">
        Current Session
      </div>
      {!isLoading ? (
        <pre className="px-4 py-6 break-all whitespace-pre-wrap">
          {JSON.stringify(session, null, 2)}
        </pre>
      ) : (
        <div>Getting session information...</div>
      )}
    </div>
  );
};

export { SessionViewer };
