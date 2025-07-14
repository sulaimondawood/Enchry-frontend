/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

type ChartType = "area" | "line" | "multi-line";
type DataPoint = Record<string, any>;

interface AnalyticsChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  type?: ChartType;
  height?: number;
  xKey?: string;
  yKey?: string;
  lines?: {
    dataKey: string;
    stroke: string;
    fill?: string;
    name?: string;
  }[];
  domain?: [
    number | "auto" | "dataMin" | "dataMax",
    number | "auto" | "dataMin" | "dataMax"
  ];
  formatter?: (value: any, name: string) => [string, string];
  labelFormatter?: (label: any) => string;
  gradient?: {
    id: string;
    color: string;
  };
}

export function AnalyticsChart({
  title,
  description,
  data,
  type = "area",
  height = 300,
  xKey = "time",
  yKey = "value",
  lines,
  domain,
  formatter,
  labelFormatter,
  gradient,
}: AnalyticsChartProps) {
  const defaultGradient = {
    id: "colorGradient",
    color: "#0F4C81",
  };

  const currentGradient = gradient || defaultGradient;

  const renderChart = () => {
    if (type === "multi-line") {
      return (
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={domain} />
          <Tooltip formatter={formatter} labelFormatter={labelFormatter} />
          <Legend />
          {lines?.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={line.stroke}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      );
    }

    if (type === "line") {
      return (
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={domain} />
          <Tooltip formatter={formatter} labelFormatter={labelFormatter} />
          <Line
            type="monotone"
            dataKey={yKey}
            stroke={currentGradient.color}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      );
    }

    // Default area chart
    return (
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={currentGradient.id} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={currentGradient.color}
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor={currentGradient.color}
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} domain={domain} />
        <Tooltip formatter={formatter} labelFormatter={labelFormatter} />
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={currentGradient.color}
          fillOpacity={1}
          fill={`url(#${currentGradient.id})`}
        />
      </AreaChart>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height: height }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
