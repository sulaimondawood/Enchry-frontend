import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  Lock,
  RefreshCw,
  Server,
  ShieldCheck,
  Zap,
} from "lucide-react";
import React from "react";

export const Features = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="security-pattern absolute inset-0 opacity-5"></div>
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-3xl font-bold `}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-teal">
              Key Security Features
            </span>
          </h2>
          <p
            className={`mt-4 text-lg text-muted-foreground max-w-2xl mx-auto `}
          >
            Our enhanced ChaCha-20 algorithm provides superior security while
            maintaining exceptional performance for resource-constrained IoT
            devices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card
            className={`border border-border hover:shadow-md transition-all hover:border-brand-teal/50 group `}
          >
            <CardContent className="p-6 pt-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center mb-4 group-hover:animate-pulse-slow">
                <ShieldCheck className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Enhanced Encryption
              </h3>
              <p className="text-muted-foreground">
                Modified ChaCha-20 algorithm with improved 256-bit key handling
                and nonce management specifically for IoT security constraints.
              </p>
            </CardContent>
          </Card>

          <Card
            className={`border border-border hover:shadow-md transition-all hover:border-brand-teal/50 group `}
          >
            <CardContent className="p-6 pt-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center mb-4 group-hover:animate-pulse-slow">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ultra-Efficient</h3>
              <p className="text-muted-foreground">
                Optimized for low-power IoT devices with minimal CPU and memory
                footprint, ensuring maximum battery life for remote sensors.
              </p>
            </CardContent>
          </Card>

          <Card
            className={`border border-border hover:shadow-md transition-all hover:border-brand-teal/50 group `}
          >
            <CardContent className="p-6 pt-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center mb-4 group-hover:animate-pulse-slow">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Real-time Monitoring
              </h3>
              <p className="text-muted-foreground">
                Secure real-time temperature and humidity data with
                comprehensive analytics and alerting capabilities.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          <Card
            className={`border border-border hover:shadow-md transition-all hover:border-brand-teal/50 group `}
          >
            <CardContent className="p-6 pt-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center mb-4 group-hover:animate-pulse-slow">
                <Server className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Edge Computing</h3>
              <p className="text-muted-foreground">
                Process and encrypt data at the edge to minimize transmission
                risks and reduce cloud processing costs for your IoT deployment.
              </p>
            </CardContent>
          </Card>

          <Card
            className={`border border-border hover:shadow-md transition-all hover:border-brand-teal/50 group `}
          >
            <CardContent className="p-6 pt-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center mb-4 group-hover:animate-pulse-slow">
                <RefreshCw className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automatic Updates</h3>
              <p className="text-muted-foreground">
                Stay protected with OTA security updates that ensure your
                encryption remains effective against evolving threats.
              </p>
            </CardContent>
          </Card>

          <Card
            className={`border border-border hover:shadow-md transition-all hover:border-brand-teal/50 group `}
          >
            <CardContent className="p-6 pt-6">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center mb-4 group-hover:animate-pulse-slow">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Key Management</h3>
              <p className="text-muted-foreground">
                Advanced key rotation and secure storage mechanisms to prevent
                unauthorized device access and data breaches.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
