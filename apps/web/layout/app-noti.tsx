"use client";

import { dbApiClient } from "@/client";
import { useEffect, useState } from "react";

export function AppNoti() {
  const [noti, setNoti] = useState<any[]>([]);

  useEffect(() => {
    dbApiClient
      .from("notification")
      .select("*,notification_read(*)")
      .is("notification_read.id", null)
      .then((data) => {
        setNoti(data?.data || []);
      });
  }, []);

  //   List of notifications scrollable
  return (
    <div>
      <h1 className="font-semibold text-lg mb-4">Notifications</h1>
      <div className="rounded-md overflow-y-scroll h-[350px]">
        <div className="space-y-4">
          {noti.map((n) => (
            <Notification key={n.id} title={n.title} content={n.content} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Notification({ title, content }: { title: string; content: string }) {
  return (
    <div className="bg-green-500 shadow-md rounded-md p-4 mb-4">
      <div className="flex items-center">
        <div className="bg-blue-500 text-white rounded-full h-6 w-6 flex items-center justify-center mr-2">
          🔔
        </div>
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-600">{content}</p>
        </div>
      </div>
    </div>
  );
}
