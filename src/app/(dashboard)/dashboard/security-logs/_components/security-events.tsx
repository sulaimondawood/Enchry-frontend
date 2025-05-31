import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Info, ShieldAlert } from "lucide-react";

export type SecurityEventLevel = "info" | "warning" | "critical" | "success";

export interface SecurityEvent {
  id: string;
  timestamp: string;
  level: SecurityEventLevel;
  title: string;
  description: string;
  deviceId?: string;
  deviceName?: string;
  resolved?: boolean;
}

interface SecurityEventsListProps {
  events: SecurityEvent[];
  maxHeight?: number;
  title?: string;
  description?: string;
}

export function SecurityEventsList({
  events,
  maxHeight = 400,
  title = "Security Events",
  description = "Recent security activity",
}: SecurityEventsListProps) {
  const getEventIcon = (level: SecurityEventLevel) => {
    switch (level) {
      case "critical":
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "info":
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getEventBadge = (level: SecurityEventLevel) => {
    switch (level) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge className="bg-amber-500">Warning</Badge>;
      case "success":
        return <Badge className="bg-green-500">Success</Badge>;
      case "info":
      default:
        return <Badge variant="outline">Info</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-full" style={{ maxHeight }}>
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-muted p-4 rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    {getEventIcon(event.level)}
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {event.description}
                      </p>
                      {event.deviceName && (
                        <p className="text-xs mt-1">
                          Device: {event.deviceName}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getEventBadge(event.level)}
                    <span className="text-xs text-muted-foreground">
                      {event.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No security events found
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
