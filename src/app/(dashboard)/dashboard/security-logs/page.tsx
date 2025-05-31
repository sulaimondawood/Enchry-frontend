"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Download, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { DashboardPageHeader } from "@/components/global/dashboard-page-header";
import {
  SecurityEvent,
  SecurityEventsList,
} from "./_components/security-events";

// Sample security events data
const securityEventsData: SecurityEvent[] = [
  {
    id: "event-001",
    timestamp: "2025-05-10T14:23:00Z",
    level: "success",
    title: "Key rotation completed",
    description:
      "ChaCha-20 encryption keys were successfully rotated on all devices",
    resolved: true,
  },
  {
    id: "event-002",
    timestamp: "2025-05-10T10:15:00Z",
    level: "info",
    title: "Security scan completed",
    description: "No threats detected during routine security scan",
    resolved: true,
  },
  {
    id: "event-003",
    timestamp: "2025-05-09T18:42:00Z",
    level: "warning",
    title: "Device disconnected",
    description: "Bathroom Sensor disconnected unexpectedly",
    deviceId: "device-004",
    deviceName: "Bathroom Sensor",
    resolved: false,
  },
  {
    id: "event-004",
    timestamp: "2025-05-09T12:03:00Z",
    level: "info",
    title: "System updated",
    description: "System updated to latest security patches",
    resolved: true,
  },
  {
    id: "event-005",
    timestamp: "2025-05-08T23:17:00Z",
    level: "critical",
    title: "Multiple failed login attempts",
    description: "Multiple failed login attempts detected from IP 192.168.1.35",
    resolved: true,
  },
  {
    id: "event-006",
    timestamp: "2025-05-08T16:05:00Z",
    level: "warning",
    title: "Firmware update available",
    description: "New security firmware update available for Garage Sensor",
    deviceId: "device-006",
    deviceName: "Garage Sensor",
    resolved: false,
  },
  {
    id: "event-007",
    timestamp: "2025-05-08T09:47:00Z",
    level: "info",
    title: "Key rotation scheduled",
    description:
      "Next ChaCha-20 key rotation scheduled for 2025-05-09T23:00:00Z",
    resolved: true,
  },
  {
    id: "event-008",
    timestamp: "2025-05-07T22:34:00Z",
    level: "info",
    title: "New device added",
    description: 'New device "Garage Sensor" was added to the network',
    deviceId: "device-006",
    deviceName: "Garage Sensor",
    resolved: true,
  },
  {
    id: "event-009",
    timestamp: "2025-05-07T14:22:00Z",
    level: "warning",
    title: "Battery low",
    description: "Bathroom Sensor battery level is below 25%",
    deviceId: "device-004",
    deviceName: "Bathroom Sensor",
    resolved: false,
  },
  {
    id: "event-010",
    timestamp: "2025-05-07T11:08:00Z",
    level: "critical",
    title: "Unauthorized access attempt",
    description: "Unauthorized access attempt detected from IP 203.0.113.42",
    resolved: true,
  },
  {
    id: "event-011",
    timestamp: "2025-05-07T08:15:00Z",
    level: "info",
    title: "Security policy updated",
    description:
      "Security policy updated to enforce stronger password requirements",
    resolved: true,
  },
  {
    id: "event-012",
    timestamp: "2025-05-06T19:40:00Z",
    level: "success",
    title: "Vulnerability patched",
    description:
      "All devices patched against recently discovered ChaCha-20 implementation vulnerability",
    resolved: true,
  },
];

const SecurityLogsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const filteredEvents = securityEventsData.filter((event) => {
    // Apply search filter
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.deviceName &&
        event.deviceName.toLowerCase().includes(searchQuery.toLowerCase()));

    // Apply level filter
    const matchesLevel = levelFilter === "all" || event.level === levelFilter;

    // Apply date filter if set
    const matchesDate = date
      ? new Date(event.timestamp).toDateString() === date.toDateString()
      : true;

    return matchesSearch && matchesLevel && matchesDate;
  });

  const handleExportLogs = () => {
    // In a real app, this would generate and download a CSV or PDF file
    alert("Logs would be exported here in a real implementation.");
  };

  // Statistics
  const criticalCount = securityEventsData.filter(
    (e) => e.level === "critical"
  ).length;
  const warningCount = securityEventsData.filter(
    (e) => e.level === "warning"
  ).length;
  const resolvedCount = securityEventsData.filter((e) => e.resolved).length;
  const unresolvedCount = securityEventsData.filter((e) => !e.resolved).length;

  return (
    <div>
      <DashboardPageHeader
        title="Security Logs"
        description="Monitor and analyze security events across your IoT network"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Critical Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{warningCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unresolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unresolvedCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search security events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="success">Success</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[180px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button variant="outline" onClick={handleExportLogs}>
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
        </div>
      </div>

      <SecurityEventsList
        events={filteredEvents}
        maxHeight={600}
        title="Security Event Log"
        description={`${filteredEvents.length} events found based on your filters`}
      />
    </div>
  );
};

export default SecurityLogsPage;
