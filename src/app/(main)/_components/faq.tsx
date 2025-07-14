import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const Faq = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our secure IoT temperature
            monitoring solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="border border-border hover:shadow-md transition-all">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-start">
                <span className="text-brand-teal mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
                How does ChaCha-20 compare to AES?
              </h3>
              <p className="text-muted-foreground">
                ChaCha-20 is more efficient on small IoT devices without
                dedicated encryption hardware. It uses less power and CPU
                resources while providing comparable security to AES.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-md transition-all">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-start">
                <span className="text-brand-teal mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
                Can I integrate with existing IoT devices?
              </h3>
              <p className="text-muted-foreground">
                Yes, our solution works with most commercial IoT temperature
                sensors through our secure gateway device or direct firmware
                updates for compatible systems.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-md transition-all">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-start">
                <span className="text-brand-teal mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
                What&apos;s the battery impact?
              </h3>
              <p className="text-muted-foreground">
                Our optimized implementation typically extends battery life by
                15-30% compared to standard encryption protocols due to more
                efficient processing.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border hover:shadow-md transition-all">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2 flex items-start">
                <span className="text-brand-teal mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
                Do you offer on-premises deployment?
              </h3>
              <p className="text-muted-foreground">
                Yes, our enterprise plan includes fully on-premises deployment
                options with no data ever leaving your network, ideal for highly
                regulated industries.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/faq">
            <Button variant="outline" className="gap-2 group">
              View All FAQs
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
