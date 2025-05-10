import { DashboardSidebar } from "@/components/global/sidebar";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="flex">
        <DashboardSidebar />
        <div className="w-full h-screen overflow-auto flex-1">
          <div className="px-6 max-w-7xl mx-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
