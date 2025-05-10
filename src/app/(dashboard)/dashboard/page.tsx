"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  ThermometerSnowflake,
} from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

// Sample data for temperature and humidity charts
const temperatureData = [
  { time: "00:00", value: 22.3 },
  { time: "02:00", value: 21.8 },
  { time: "04:00", value: 21.2 },
  { time: "06:00", value: 21.5 },
  { time: "08:00", value: 22.1 },
  { time: "10:00", value: 23.4 },
  { time: "12:00", value: 24.8 },
  { time: "14:00", value: 25.2 },
  { time: "16:00", value: 24.7 },
  { time: "18:00", value: 24.1 },
  { time: "20:00", value: 23.5 },
  { time: "22:00", value: 22.8 },
];

const humidityData = [
  { time: "00:00", value: 62 },
  { time: "02:00", value: 64 },
  { time: "04:00", value: 65 },
  { time: "06:00", value: 67 },
  { time: "08:00", value: 63 },
  { time: "10:00", value: 59 },
  { time: "12:00", value: 55 },
  { time: "14:00", value: 52 },
  { time: "16:00", value: 54 },
  { time: "18:00", value: 58 },
  { time: "20:00", value: 60 },
  { time: "22:00", value: 61 },
];

// Sample device data
const devices = [
  {
    id: "device-001",
    name: "Living Room Sensor",
    type: "Temperature & Humidity",
    status: "online",
    lastSeen: "Just now",
    temperature: 23.5,
    humidity: 55,
    batteryLevel: 87,
    encryptionStatus: "secured",
  },
  {
    id: "device-002",
    name: "Kitchen Sensor",
    type: "Temperature & Humidity",
    status: "online",
    lastSeen: "3 minutes ago",
    temperature: 24.8,
    humidity: 52,
    batteryLevel: 65,
    encryptionStatus: "secured",
  },
  {
    id: "device-003",
    name: "Bedroom Sensor",
    type: "Temperature",
    status: "online",
    lastSeen: "5 minutes ago",
    temperature: 21.2,
    humidity: null,
    batteryLevel: 92,
    encryptionStatus: "secured",
  },
  {
    id: "device-004",
    name: "Bathroom Sensor",
    type: "Humidity",
    status: "offline",
    lastSeen: "3 hours ago",
    temperature: null,
    humidity: 78,
    batteryLevel: 23,
    encryptionStatus: "unknown",
  },
];

// Security stats
const securityStats = [
  {
    title: "Encryption Status",
    value: "100%",
    description: "All online devices secured",
    icon: ShieldCheck,
    status: "success",
  },
  {
    title: "Last Security Scan",
    value: "23 min ago",
    description: "No vulnerabilities detected",
    icon: CheckCircle2,
    status: "success",
  },
  {
    title: "Security Alerts",
    value: "1",
    description: "1 device offline",
    icon: AlertCircle,
    status: "warning",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  // const { toast } = useToast();

  const handleAlertClick = () => {
    // toast({
    //   title: "Security Alert",
    //   description:
    //     "Bathroom sensor (device-004) is offline and may be compromised.",
    //   variant: "destructive",
    // });
  };

  return (
    <div className="min-h-screen bg-background w-full">
      <div className="flex-1">
        <div className="p-6 md:p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and control your secure IoT temperature network.
            </p>
          </header>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg. Temperature
                    </CardTitle>
                    <ThermometerSnowflake className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">23.4°C</div>
                    <p className="text-xs text-muted-foreground">
                      +1.2°C from yesterday
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Avg. Humidity
                    </CardTitle>
                    <svg
                      className="h-4 w-4 text-muted-foreground"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M12 4v16M7 8c0-2.21 2.239-4 5-4s5 1.79 5 4-2.239 4-5 4M7 16c0-2.21 2.239-4 5-4s5 1.79 5 4-2.239 4-5 4-5-1.79-5-4z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">58%</div>
                    <p className="text-xs text-muted-foreground">
                      -3% from yesterday
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Devices
                    </CardTitle>
                    <svg
                      className="h-4 w-4 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3 / 4</div>
                    <p className="text-xs text-muted-foreground">75% online</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Temperature (24h)</CardTitle>
                    <CardDescription>
                      Average across all sensors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={temperatureData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorTemp"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#0F4C81"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#0F4C81"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                          <YAxis
                            tick={{ fontSize: 12 }}
                            domain={["dataMin - 1", "dataMax + 1"]}
                            tickFormatter={(value) => `${value}°C`}
                          />
                          <Tooltip
                            formatter={(value: number) => [
                              `${value.toFixed(1)}°C`,
                              "Temperature",
                            ]}
                            labelFormatter={(label) => `Time: ${label}`}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#0F4C81"
                            fillOpacity={1}
                            fill="url(#colorTemp)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Humidity (24h)</CardTitle>
                    <CardDescription>
                      Average across all sensors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={humidityData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="colorHumidity"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#2DD4BF"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#2DD4BF"
                                stopOpacity={0.1}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                          <YAxis
                            tick={{ fontSize: 12 }}
                            domain={[40, 80]}
                            tickFormatter={(value) => `${value}%`}
                          />
                          <Tooltip
                            formatter={(value: number) => [
                              `${value}%`,
                              "Humidity",
                            ]}
                            labelFormatter={(label) => `Time: ${label}`}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#2DD4BF"
                            fillOpacity={1}
                            fill="url(#colorHumidity)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="devices">
              <div className="grid gap-6">
                {devices.map((device) => (
                  <Card
                    key={device.id}
                    className={
                      device.status === "offline" ? "border-destructive/50" : ""
                    }
                  >
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <div>
                        <CardTitle>{device.name}</CardTitle>
                        <CardDescription>{device.type}</CardDescription>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            device.status === "online"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          }`}
                        >
                          {device.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {device.temperature !== null && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Temperature
                            </p>
                            <p className="text-lg font-semibold">
                              {device.temperature}°C
                            </p>
                          </div>
                        )}
                        {device.humidity !== null && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              Humidity
                            </p>
                            <p className="text-lg font-semibold">
                              {device.humidity}%
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Battery
                          </p>
                          <p className="text-lg font-semibold">
                            {device.batteryLevel}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Security
                          </p>
                          <p className="text-lg font-semibold flex items-center">
                            {device.encryptionStatus === "secured" ? (
                              <>
                                <ShieldCheck className="h-4 w-4 mr-1 text-green-600" />
                                <span>Secured</span>
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-4 w-4 mr-1 text-amber-600" />
                                <span>Unknown</span>
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {securityStats.map((stat, index) => (
                  <Card
                    key={index}
                    className={
                      stat.status === "warning" ? "border-amber-200" : ""
                    }
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <stat.icon
                        className={`h-4 w-4 ${
                          stat.status === "success"
                            ? "text-green-600"
                            : stat.status === "warning"
                            ? "text-amber-600"
                            : "text-muted-foreground"
                        }`}
                      />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">
                        {stat.description}
                      </p>
                      {stat.status === "warning" && (
                        <button
                          onClick={handleAlertClick}
                          className="mt-3 text-xs text-amber-600 hover:text-amber-700 font-medium"
                        >
                          View Alert Details
                        </button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>ChaCha-20 Encryption Status</CardTitle>
                  <CardDescription>
                    Enhanced security protocol performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Encryption Overview
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-muted rounded-md p-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          Protocol
                        </p>
                        <p className="text-lg font-semibold">
                          Enhanced ChaCha-20
                        </p>
                      </div>
                      <div className="bg-muted rounded-md p-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          Key Size
                        </p>
                        <p className="text-lg font-semibold">256-bit</p>
                      </div>
                      <div className="bg-muted rounded-md p-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          Nonce
                        </p>
                        <p className="text-lg font-semibold">96-bit, Dynamic</p>
                      </div>
                      <div className="bg-muted rounded-md p-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          Authentication
                        </p>
                        <p className="text-lg font-semibold">Poly1305 MAC</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Security Metrics
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Key Rotation
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            Strong
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-green-600 h-full w-[95%]"></div>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Security Level
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            Excellent
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-green-600 h-full w-[98%]"></div>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">
                            Performance Impact
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            Minimal
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className="bg-green-600 h-full w-[85%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Last Security Events
                    </h3>
                    <div className="bg-muted rounded-md p-4 max-h-48 overflow-y-auto">
                      <div className="space-y-2">
                        <div className="flex gap-2 text-sm">
                          <span className="text-muted-foreground whitespace-nowrap">
                            Today 14:23
                          </span>
                          <span className="font-medium">
                            Key rotation completed successfully
                          </span>
                        </div>
                        <div className="flex gap-2 text-sm">
                          <span className="text-muted-foreground whitespace-nowrap">
                            Today 10:15
                          </span>
                          <span className="font-medium">
                            Security scan completed - No threats detected
                          </span>
                        </div>
                        <div className="flex gap-2 text-sm">
                          <span className="text-muted-foreground whitespace-nowrap">
                            Yesterday 18:42
                          </span>
                          <span className="font-medium">
                            Bathroom Sensor disconnected
                          </span>
                        </div>
                        <div className="flex gap-2 text-sm">
                          <span className="text-muted-foreground whitespace-nowrap">
                            Yesterday 12:03
                          </span>
                          <span className="font-medium">
                            System updated to latest security patches
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
