"use client";

import {
  Home,
  Settings,
  LogOut,
  ThermometerSnowflake,
  Shield,
  Layers,
  Activity,
  Play,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/routes";

type SidebarLinkProps = {
  to: string;
  icon: React.ElementType;
  label: string;
};

const SidebarLink = ({ to, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <Link
      href={to}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
        isActive
          ? "bg-white text-sidebar-foreground"
          : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
      )}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );
};

export function DashboardSidebar() {
  return (
    <aside
      className={
        "bg-slate-100 z-40 transition-all duration-300 px-4 pt-6 pb-8 basis-[250px] flex flex-col h-screen border-r border-[#E4E4E4]"
      }
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center gap-2 border-b border-sidebar-border">
          <img src={"/enchry-logo.png"} />
        </div>

        <div className="flex-1 py-6 flex flex-col">
          <div className="px-4 pb-2 mb-2">
            <h3 className="text-xs uppercase tracking-wider text-sidebar-foreground/70">
              Monitoring
            </h3>
          </div>
          <div className="space-y-1">
            <SidebarLink to="/dashboard" icon={Home} label="Dashboard" />
            <SidebarLink
              to={ROUTES.dashboardDevice}
              icon={ThermometerSnowflake}
              label="Devices"
            />
            <SidebarLink
              to={ROUTES.dashboardSimulator}
              icon={Play}
              label="Simulator"
            />
            <SidebarLink
              to={ROUTES.dashboardAnalytics}
              icon={Activity}
              label="Analytics"
            />
          </div>

          <div className="px-4 pt-6 pb-2 mb-2">
            <h3 className="text-xs uppercase tracking-wider text-sidebar-foreground/70">
              Security
            </h3>
          </div>
          <div className="space-y-1">
            <SidebarLink
              to={ROUTES.dashboardEncryption}
              icon={Shield}
              label="ChaCha-20 Settings"
            />

            <SidebarLink
              to={ROUTES.dashboardSettings}
              icon={Settings}
              label="Settings"
            />
          </div>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <Link href={""}>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
