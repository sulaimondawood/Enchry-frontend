"use client";

import { useState, useEffect } from "react";

import Testimonial from "./_components/testimonials";
import { UseCases } from "./_components/use-cases";
import { Faq } from "./_components/faq";
import { GetStarted } from "./_components/get-started";
import { Features } from "./_components/features";
import { Stats } from "./_components/stats";
import { Hero } from "./_components/hero";

const Index = () => {
  const [, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div className="pt-16">
        <Hero />

        <Stats />

        <Features />

        {/* How It Works Section */}
        <section className="py-20 bg-muted/50 relative overflow-hidden">
          <div className="container relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-teal">
                  How It Works
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Our system uses a streamlined approach to secure your IoT
                temperature monitoring network
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center text-white text-xl font-bold mb-4 animate-pulse-slow">
                    1
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    Secure Device Onboarding
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Each IoT device undergoes secure authentication and receives
                    unique encryption keys
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-transparent via-brand-teal to-transparent transform -translate-x-1/6"></div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center text-white text-xl font-bold mb-4 animate-pulse-slow">
                    2
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    Enhanced Encryption
                  </h3>
                  <p className="text-center text-muted-foreground">
                    Data is encrypted using our optimized ChaCha-20 algorithm
                    before transmission
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-transparent via-brand-teal to-transparent transform -translate-x-1/6"></div>
              </div>

              <div className="relative">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center text-white text-xl font-bold mb-4 animate-pulse-slow">
                    3
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-center">
                    Secure Monitoring
                  </h3>
                  <p className="text-center text-muted-foreground">
                    View real-time data while maintaining end-to-end security
                    throughout the system
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">What Our Clients Say</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Trusted by IoT professionals worldwide for mission-critical
                deployments
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Testimonial
                quote="We reduced our IoT network power consumption by 35% after implementing SecureTemp's encryption solution while improving our security posture."
                author="Sarah Johnson"
                role="CTO"
                company="SmartTech Industries"
              />
              <Testimonial
                quote="The temperature monitoring system has been flawless. We've maintained 99.99% uptime while ensuring all sensitive data remains fully encrypted."
                author="Michael Chen"
                role="Head of IoT"
                company="GreenSense Solutions"
              />
              <Testimonial
                quote="After several security audits, SecureTemp's ChaCha-20 implementation proved to be the most robust solution for our industrial IoT network."
                author="Elena Rodriguez"
                role="Security Director"
                company="Industrial Systems Inc."
              />
            </div>
          </div>
        </section>

        <UseCases />

        <GetStarted />

        <Faq />
      </div>
    </>
  );
};

export default Index;
