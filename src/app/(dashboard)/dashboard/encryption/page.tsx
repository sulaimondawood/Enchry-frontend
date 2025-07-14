"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  AlertTriangle,
  Clock,
  Download,
  Upload,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { DashboardPageHeader } from "@/components/global/dashboard-page-header";
import { EncryptionConfigCard } from "./_components/encryption-config";

const EncryptionSettingsPage = () => {
  const { toast } = useToast();

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Updated",
      description: "Your encryption settings have been updated successfully.",
    });
  };

  const handleForceRotation = () => {
    toast({
      title: "Key Rotation Initiated",
      description:
        "A network-wide key rotation has been initiated for all devices.",
    });
  };

  const handleFirmwareUpdate = () => {
    toast({
      description:
        "Firmware update process started. This may take several minutes.",
    });
  };

  const handleBackupKeys = () => {
    toast({
      title: "Encryption Keys Backed Up",
      description: "Your keys have been securely backed up.",
    });
  };

  const handleRestoreKeys = () => {
    toast({
      title: "Keys Restored",
      description: "Your encryption keys have been successfully restored.",
    });
  };

  return (
    <div>
      <DashboardPageHeader
        title="ChaCha-20 Encryption Settings"
        description="Configure and manage your secure encryption protocol"
      />

      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className="bg-green-600">Active</Badge>
          <span className="text-sm text-muted-foreground">
            Last updated: 2 days ago
          </span>
        </div>
        <Button variant="outline" onClick={handleForceRotation}>
          <RefreshCcw className="mr-2 h-4 w-4" />
          Force Key Rotation
        </Button>
      </div>

      <Tabs defaultValue="config">
        <TabsList className="mb-6">
          <TabsTrigger value="config">Configuration</TabsTrigger>
          <TabsTrigger value="network">Network Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          <TabsTrigger value="backup">Backup & Recovery</TabsTrigger>
        </TabsList>

        <TabsContent value="config">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  <CardTitle>ChaCha-20 Status</CardTitle>
                </div>
                <CardDescription>
                  The ChaCha-20 encryption protocol is currently active and
                  protecting your network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Protocol Version
                    </p>
                    <p>ChaCha-20 v2.4</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Key Size
                    </p>
                    <p>256-bit</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Next Key Rotation
                    </p>
                    <p>In 22 hours</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Authentication
                    </p>
                    <p>Poly1305 MAC</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <EncryptionConfigCard
              title="General Configuration"
              description="Basic encryption settings for your IoT network"
              onSave={handleSaveConfig}
            />
          </div>
        </TabsContent>

        <TabsContent value="network">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Security Overview</CardTitle>
                <CardDescription>
                  Current security status of your IoT network
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">
                      Devices secured with ChaCha-20
                    </span>
                    <span className="text-green-600">5/6 (83%)</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="bg-green-600 h-full rounded-full"
                      style={{ width: "83%" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Protocol Security
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>End-to-end encryption</span>
                        <span className="text-green-600">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>TLS 1.3 transport security</span>
                        <span className="text-green-600">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>API endpoint protection</span>
                        <span className="text-green-600">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Quantum-resistant algorithms</span>
                        <span className="text-amber-600">Partial</span>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">
                      Network Protections
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span>Intrusion detection</span>
                        <span className="text-green-600">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>DDoS protection</span>
                        <span className="text-green-600">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Automatic blocking</span>
                        <span className="text-green-600">Enabled</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Anti-tampering measures</span>
                        <span className="text-amber-600">Basic</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="pt-2">
                  <h3 className="text-lg font-medium mb-2">
                    Device Security Status
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <div>
                        <p className="font-medium">Living Room Sensor</p>
                        <p className="text-sm text-muted-foreground">
                          Last updated: 3 hours ago
                        </p>
                      </div>
                      <Badge className="bg-green-600">Secured</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <div>
                        <p className="font-medium">Kitchen Sensor</p>
                        <p className="text-sm text-muted-foreground">
                          Last updated: 5 hours ago
                        </p>
                      </div>
                      <Badge className="bg-green-600">Secured</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <div>
                        <p className="font-medium">Bedroom Sensor</p>
                        <p className="text-sm text-muted-foreground">
                          Last updated: 12 hours ago
                        </p>
                      </div>
                      <Badge className="bg-green-600">Secured</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <div>
                        <p className="font-medium">Bathroom Sensor</p>
                        <p className="text-sm text-muted-foreground">
                          Last updated: 3 days ago
                        </p>
                      </div>
                      <Badge variant="outline">Offline</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <div>
                        <p className="font-medium">Basement Sensor</p>
                        <p className="text-sm text-muted-foreground">
                          Last updated: 6 hours ago
                        </p>
                      </div>
                      <Badge className="bg-green-600">Secured</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <div>
                        <p className="font-medium">Garage Sensor</p>
                        <p className="text-sm text-muted-foreground">
                          Last updated: 2 days ago
                        </p>
                      </div>
                      <Badge className="bg-red-600">Vulnerable</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="grid gap-6">
            <Card className="border-amber-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle>Advanced Settings Warning</CardTitle>
                </div>
                <CardDescription>
                  Changes to these settings may affect network performance and
                  security. Only modify if you understand the implications.
                </CardDescription>
              </CardHeader>
            </Card>

            <EncryptionConfigCard
              title="Advanced ChaCha-20 Configuration"
              description="Fine-tune encryption parameters"
              onSave={handleSaveConfig}
              advanced={true}
            />

            <Card>
              <CardHeader>
                <CardTitle>Device Firmware Management</CardTitle>
                <CardDescription>
                  Update security firmware across your network
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Latest Firmware</h3>
                    <p className="text-sm text-muted-foreground">
                      v1.2.4 (released 2025-05-01)
                    </p>
                  </div>
                  <Button onClick={handleFirmwareUpdate}>
                    Update All Devices
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="font-medium">Update Notes:</p>
                  <ul className="space-y-1 text-sm list-disc pl-5">
                    <li>Enhanced nonce generation algorithm</li>
                    <li>Fixed potential memory leak in key derivation</li>
                    <li>
                      Improved power efficiency during encryption operations
                    </li>
                    <li>
                      Added support for hardware-accelerated ChaCha20 on
                      compatible devices
                    </li>
                    <li>Security hardening against timing attacks</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="backup">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Encryption Key Management</CardTitle>
                <CardDescription>
                  Backup and restore your network encryption keys
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Download className="h-5 w-5" />
                      <h3 className="text-lg font-medium">Backup Keys</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Create an encrypted backup of your ChaCha-20 keys and
                      security settings. The backup will be password protected.
                    </p>
                    <Button onClick={handleBackupKeys}>Create Backup</Button>
                  </div>

                  <div className="border rounded-md p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Upload className="h-5 w-5" />
                      <h3 className="text-lg font-medium">Restore Keys</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Restore previously backed up ChaCha-20 keys and security
                      settings. This will overwrite your current configuration.
                    </p>
                    <Button variant="outline" onClick={handleRestoreKeys}>
                      Restore from Backup
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5" />
                    <h3 className="text-lg font-medium">
                      Key Rotation History
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <div>
                        <p className="font-medium">Full Network Rotation</p>
                        <p className="text-sm text-muted-foreground">
                          2025-05-09 23:00:00Z
                        </p>
                      </div>
                      <Badge className="bg-green-600">Success</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <div>
                        <p className="font-medium">Full Network Rotation</p>
                        <p className="text-sm text-muted-foreground">
                          2025-05-08 23:00:00Z
                        </p>
                      </div>
                      <Badge className="bg-green-600">Success</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <div>
                        <p className="font-medium">Partial Network Rotation</p>
                        <p className="text-sm text-muted-foreground">
                          2025-05-07 23:00:00Z
                        </p>
                      </div>
                      <Badge className="bg-amber-500">Partial</Badge>
                    </div>
                    <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                      <div>
                        <p className="font-medium">Full Network Rotation</p>
                        <p className="text-sm text-muted-foreground">
                          2025-05-06 23:00:00Z
                        </p>
                      </div>
                      <Badge className="bg-green-600">Success</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EncryptionSettingsPage;
