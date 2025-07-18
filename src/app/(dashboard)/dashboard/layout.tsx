import { DashboardSidebar } from "@/components/global/sidebar";
import DetectDeviceConnectivity from "@/components/user-agent/detect-device-connectivity";
import React, { ReactNode, Suspense } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="flex">
          <DashboardSidebar />
          <div className="w-full h-screen overflow-auto flex-1">
            <div className="px-6 max-w-7xl mx-auto">
              {children}
              <DetectDeviceConnectivity />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default DashboardLayout;
