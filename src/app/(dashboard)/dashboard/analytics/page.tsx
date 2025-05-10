"use client";

import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Activity, ThermometerSnowflake, Clock, Database } from "lucide-react";
import { AnalyticsChart } from "./_components/chart";
import { StatsCard } from "./_components/stats-card";
import { DashboardPageHeader } from "@/components/global/dashboard-page-header";

// Sample data
const temperatureData = [
  { day: "Mon", value: 22.3, min: 21.2, max: 23.5 },
  { day: "Tue", value: 21.8, min: 20.5, max: 22.9 },
  { day: "Wed", value: 21.2, min: 19.8, max: 22.4 },
  { day: "Thu", value: 21.5, min: 20.0, max: 23.1 },
  { day: "Fri", value: 22.1, min: 21.0, max: 24.2 },
  { day: "Sat", value: 23.4, min: 21.6, max: 25.0 },
  { day: "Sun", value: 24.8, min: 22.3, max: 26.5 },
];

const humidityData = [
  { day: "Mon", value: 62 },
  { day: "Tue", value: 64 },
  { day: "Wed", value: 65 },
  { day: "Thu", value: 67 },
  { day: "Fri", value: 63 },
  { day: "Sat", value: 59 },
  { day: "Sun", value: 55 },
];

const weeklyData = [
  { name: "Week 1", temperature: 22.1, humidity: 63 },
  { name: "Week 2", temperature: 22.8, humidity: 61 },
  { name: "Week 3", temperature: 23.2, humidity: 58 },
  { name: "Week 4", temperature: 22.5, humidity: 60 },
];

const monthlyData = [
  { name: "Jan", temperature: 19.5, humidity: 68 },
  { name: "Feb", temperature: 20.3, humidity: 65 },
  { name: "Mar", temperature: 21.8, humidity: 63 },
  { name: "Apr", temperature: 22.7, humidity: 59 },
  { name: "May", temperature: 23.9, humidity: 57 },
  { name: "Jun", temperature: 25.2, humidity: 54 },
];

// Energy usage by device in kWh
const energyData = [
  { name: "Living Room", value: 2.8 },
  { name: "Kitchen", value: 2.4 },
  { name: "Bedroom", value: 1.7 },
  { name: "Bathroom", value: 1.1 },
  { name: "Basement", value: 3.2 },
  { name: "Garage", value: 1.5 },
];

// Temperature range comparison
const temperatureRanges = [
  { day: "Mon", min: 19.5, max: 24.2 },
  { day: "Tue", min: 19.0, max: 23.8 },
  { day: "Wed", min: 18.5, max: 23.0 },
  { day: "Thu", min: 19.2, max: 23.5 },
  { day: "Fri", min: 19.8, max: 24.5 },
  { day: "Sat", min: 20.2, max: 25.7 },
  { day: "Sun", min: 20.8, max: 26.3 },
];

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div>
      <DashboardPageHeader
        title="Analytics"
        description="Monitor temperature and humidity patterns across your network"
      />

      <div className="flex justify-end mb-6">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 Hours</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Average Temperature"
          value="23.4°C"
          description="past 7 days"
          icon={ThermometerSnowflake}
          trend={{ value: "1.2°C", positive: true }}
        />
        <StatsCard
          title="Average Humidity"
          value="58%"
          description="past 7 days"
          icon={Activity}
          trend={{ value: "3%", positive: false }}
        />
        <StatsCard
          title="Data Points Collected"
          value="15,843"
          description="past 7 days"
          icon={Database}
          trend={{ value: "12%", positive: true }}
        />
        <StatsCard
          title="Real-time Updates"
          value="5 min"
          description="current interval"
          icon={Clock}
          trend={{ value: "unchanged", neutral: true }}
        />
      </div>

      <Tabs defaultValue="temperature" className="mb-8">
        <TabsList>
          <TabsTrigger value="temperature">Temperature</TabsTrigger>
          <TabsTrigger value="humidity">Humidity</TabsTrigger>
          <TabsTrigger value="combined">Combined Analysis</TabsTrigger>
          <TabsTrigger value="energy">Energy Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="temperature" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AnalyticsChart
              title="Temperature Trends"
              description="Average daily temperature"
              data={temperatureData}
              xKey="day"
              yKey="value"
              // domain={["dataMin - 1", "dataMax + 1"]}
              formatter={(value) => [`${value}°C`, "Temperature"]}
              gradient={{ id: "colorTemp", color: "#0F4C81" }}
            />
            <AnalyticsChart
              title="Temperature Range"
              description="Daily min/max temperature"
              data={temperatureRanges}
              type="multi-line"
              xKey="day"
              lines={[
                {
                  dataKey: "min",
                  stroke: "#2DD4BF",
                  name: "Min Temperature",
                },
                {
                  dataKey: "max",
                  stroke: "#F97316",
                  name: "Max Temperature",
                },
              ]}
              formatter={(value) => [`${value}°C`, ""]}
            />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Device Temperature Comparison</CardTitle>
              <CardDescription>
                Current temperature readings across all devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {devicesWithTemperature.map((device) => (
                  <div key={device.name} className="flex items-center">
                    <div className="w-36 flex-shrink-0">
                      <span>{device.name}</span>
                    </div>
                    <div className="flex-1 mx-2">
                      <div className="bg-muted h-3 rounded-full overflow-hidden relative">
                        <div
                          className="h-3 absolute top-0 left-0 rounded-full"
                          style={{
                            background: getTemperatureColor(device.value),
                            width: `${(device.value - 15) * 10}%`, // Scale to make the bar width visually meaningful
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-12 text-right font-medium">
                      {device.value}°C
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="humidity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Humidity Trends"
              description="Average daily humidity level"
              data={humidityData}
              xKey="day"
              yKey="value"
              domain={[40, 80]}
              formatter={(value) => [`${value}%`, "Humidity"]}
              gradient={{ id: "colorHumidity", color: "#2DD4BF" }}
            />
            <Card>
              <CardHeader>
                <CardTitle>Humidity Distribution</CardTitle>
                <CardDescription>
                  Current humidity readings across zones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devicesWithHumidity.map((device) => (
                    <div key={device.name} className="flex items-center">
                      <div className="w-36 flex-shrink-0">
                        <span>{device.name}</span>
                      </div>
                      <div className="flex-1 mx-2">
                        <div className="bg-muted h-3 rounded-full overflow-hidden relative">
                          <div
                            className="h-3 absolute top-0 left-0 rounded-full bg-blue-500"
                            style={{ width: `${device.value}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right font-medium">
                        {device.value}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="combined" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <AnalyticsChart
              title="Temperature vs. Humidity"
              description="Weekly comparison"
              data={weeklyData}
              type="multi-line"
              xKey="name"
              lines={[
                {
                  dataKey: "temperature",
                  stroke: "#0F4C81",
                  name: "Temperature (°C)",
                },
                {
                  dataKey: "humidity",
                  stroke: "#2DD4BF",
                  name: "Humidity (%)",
                },
              ]}
            />

            <AnalyticsChart
              title="Monthly Averages"
              description="Temperature and humidity trends by month"
              data={monthlyData}
              type="multi-line"
              xKey="name"
              lines={[
                {
                  dataKey: "temperature",
                  stroke: "#0F4C81",
                  name: "Temperature (°C)",
                },
                {
                  dataKey: "humidity",
                  stroke: "#2DD4BF",
                  name: "Humidity (%)",
                },
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="energy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Energy Usage by Device"
              description="Average daily power consumption (kWh)"
              data={energyData}
              xKey="name"
              yKey="value"
              formatter={(value) => [`${value} kWh`, "Energy Usage"]}
              gradient={{ id: "colorEnergy", color: "#F97316" }}
            />
            <Card>
              <CardHeader>
                <CardTitle>Battery Status</CardTitle>
                <CardDescription>Current battery levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {batteryLevels.map((device) => (
                    <div key={device.name} className="flex items-center">
                      <div className="w-36 flex-shrink-0">
                        <span>{device.name}</span>
                      </div>
                      <div className="flex-1 mx-2">
                        <div className="bg-muted h-3 rounded-full overflow-hidden relative">
                          <div
                            className={`h-3 absolute top-0 left-0 rounded-full ${
                              device.value > 70
                                ? "bg-green-600"
                                : device.value > 30
                                ? "bg-amber-500"
                                : "bg-red-600"
                            }`}
                            style={{ width: `${device.value}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-12 text-right font-medium">
                        {device.value}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to get a color representing temperature
const getTemperatureColor = (temp: number) => {
  if (temp < 18) return "#0891B2"; // Cold - cyan
  if (temp < 22) return "#0D9488"; // Cool - teal
  if (temp < 25) return "#65A30D"; // Comfortable - lime
  if (temp < 28) return "#F59E0B"; // Warm - amber
  return "#DC2626"; // Hot - red
};

// Device specific data for charts
const devicesWithTemperature = [
  { name: "Living Room", value: 23.5 },
  { name: "Kitchen", value: 24.8 },
  { name: "Bedroom", value: 21.2 },
  { name: "Basement", value: 19.8 },
  { name: "Garage", value: 16.2 },
];

const devicesWithHumidity = [
  { name: "Living Room", value: 55 },
  { name: "Kitchen", value: 52 },
  { name: "Bathroom", value: 78 },
  { name: "Basement", value: 65 },
];

const batteryLevels = [
  { name: "Living Room", value: 87 },
  { name: "Kitchen", value: 65 },
  { name: "Bedroom", value: 92 },
  { name: "Bathroom", value: 23 },
  { name: "Basement", value: 76 },
  { name: "Garage", value: 32 },
];

export default AnalyticsPage;
