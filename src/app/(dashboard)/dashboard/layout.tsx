import { DashboardSidebar } from "@/components/global/sidebar";
import DetectDeviceConnectivity from "@/components/user-agent/detect-device-connectivity";
import React, { ReactNode, Suspense } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex">
        <Suspense fallback={<p>Loading...</p>}>
          <DashboardSidebar />
        </Suspense>
        <div className="w-full h-screen overflow-auto flex-1">
          <div className="px-6 max-w-7xl mx-auto">
            {children}
            <DetectDeviceConnectivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
