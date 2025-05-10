import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

export const GetStarted = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="relative bg-gradient-to-br from-brand-blue to-brand-teal rounded-lg overflow-hidden border border-white/10">
          <div className="security-pattern absolute inset-0 opacity-20"></div>
          <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="col-span-3 p-8 lg:p-12 relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-white">
                Ready to secure your IoT network?
              </h2>
              <p className="text-white/80 mb-8">
                Implement our enhanced ChaCha-20 encryption solution today and
                ensure your temperature and humidity monitoring systems remain
                protected against evolving threats.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={ROUTES.signUp}>
                  <Button
                    size="lg"
                    className="bg-white text-brand-blue hover:bg-white/90"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={ROUTES.contact}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
            <div className="col-span-2 hidden lg:flex items-center justify-center relative p-8">
              <div className="relative animate-float">
                <div className="absolute -inset-1 rounded-full bg-white/30 blur-md"></div>
                <div className="relative bg-white rounded-full h-48 w-48 flex items-center justify-center">
                  <ShieldCheck className="h-24 w-24 text-brand-blue" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
