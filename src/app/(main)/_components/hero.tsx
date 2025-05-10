import { Button } from "@/components/ui/button";
import { ArrowRight, ThermometerSnowflake } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Hero = () => {
  return (
    <section className="hero-gradient text-white relative overflow-hidden min-h-[90vh] flex items-center">
      <div className="security-pattern absolute inset-0 opacity-30"></div>
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-brand-teal/20 animate-float"></div>
        <div className="absolute top-40 right-40 w-32 h-32 rounded-full bg-brand-blue/20 animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 left-20 w-24 h-24 rounded-full bg-brand-teal/20 animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 left-40 w-16 h-16 rounded-full bg-brand-blue/20 animate-pulse-slow"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="container py-20 lg:py-32 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className={`lg:w-1/2 space-y-6 `}>
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm backdrop-blur-sm mb-6">
              <span className="bg-brand-teal rounded-full h-2 w-2 mr-2"></span>
              Enhanced Security for IoT Networks
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Advanced <span className="text-brand-teal">ChaCha-20</span>{" "}
              Encryption for IoT Temperature Monitoring
            </h1>
            <p className="text-lg opacity-90">
              Secure your IoT network with our enhanced ChaCha-20 encryption
              algorithm, specifically optimized for temperature and humidity
              monitoring systems with minimal resource consumption.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-white text-brand-blue hover:bg-white/90"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/features">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className={`lg:w-1/2 relative `}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-teal to-brand-blue rounded-lg blur-md animate-pulse-slow"></div>
              <div className="relative bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6 shadow-xl">
                <div className="absolute -top-2 -right-2 bg-brand-teal text-white text-xs py-1 px-2 rounded-md">
                  Encrypted
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      <ThermometerSnowflake className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm opacity-70">Temperature</div>
                      <div className="text-xl font-semibold">24.8°C</div>
                    </div>
                    <div className="ml-auto">
                      <div className="h-12 w-20 rounded-md overflow-hidden bg-white/10">
                        <div className="h-full w-1.5 bg-brand-teal animate-data-flow"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      <svg
                        className="h-5 w-5"
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
                    </div>
                    <div>
                      <div className="text-sm opacity-70">Humidity</div>
                      <div className="text-xl font-semibold">65%</div>
                    </div>
                    <div className="ml-auto">
                      <div className="h-12 w-20 rounded-md overflow-hidden bg-white/10">
                        <div className="h-full w-1.5 bg-brand-teal animate-data-flow"></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white/10 rounded-md flex items-center">
                    <div className="animate-pulse-slow mr-3">
                      <div className="h-3 w-3 rounded-full bg-brand-teal"></div>
                    </div>
                    <div className="text-sm font-mono opacity-80">
                      ChaCha-20 • 256-bit • Encrypted Transport
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-brand-blue/30 rounded-full blur-2xl"></div>
              <div className="absolute -top-4 -right-8 w-32 h-32 bg-brand-teal/30 rounded-full blur-2xl"></div>
            </div>

            <div className="absolute -z-10 w-full h-full bg-gradient-to-br from-brand-blue/20 to-brand-teal/20 rounded-full blur-3xl transform -translate-x-1/4 -translate-y-1/4"></div>
          </div>
        </div>
      </div>

      {/* Animated wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="relative block w-full h-[50px] md:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-background"
          ></path>
        </svg>
      </div>
    </section>
  );
};
