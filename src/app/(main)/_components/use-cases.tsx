import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export const UseCases = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-blue/5 to-brand-teal/5">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-teal">
              Industry Applications
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Our secure temperature monitoring solutions are used across various
            industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border border-border group hover:shadow-md transition-all hover:border-brand-teal/50">
            <CardContent className="p-6 pt-6">
              <div className="bg-brand-blue/10 p-4 rounded-lg mb-4 group-hover:bg-brand-blue/20 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-brand-blue"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 10V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3m14 0v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10m14 0H5"></path>
                  <rect x="8" y="2" width="8" height="4"></rect>
                  <path d="M8 14h.01"></path>
                  <path d="M12 14h.01"></path>
                  <path d="M16 14h.01"></path>
                  <path d="M8 18h.01"></path>
                  <path d="M12 18h.01"></path>
                  <path d="M16 18h.01"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Data Centers</h3>
              <p className="text-muted-foreground">
                Maintain optimal temperature while securing critical
                infrastructure data
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border group hover:shadow-md transition-all hover:border-brand-teal/50">
            <CardContent className="p-6 pt-6">
              <div className="bg-brand-blue/10 p-4 rounded-lg mb-4 group-hover:bg-brand-blue/20 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-brand-blue"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 17H5a2 2 0 0 0-2 2 2 2 0 0 0 2 2h14a2 2 0 0 0 2-2 2 2 0 0 0-2-2Z"></path>
                  <path d="M12 17V3"></path>
                  <path d="m6 7 6-4 6 4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
              <p className="text-muted-foreground">
                Monitor medicine storage conditions while maintaining HIPAA
                compliance
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border group hover:shadow-md transition-all hover:border-brand-teal/50">
            <CardContent className="p-6 pt-6">
              <div className="bg-brand-blue/10 p-4 rounded-lg mb-4 group-hover:bg-brand-blue/20 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-brand-blue"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                  <path d="M17 18h1"></path>
                  <path d="M12 18h1"></path>
                  <path d="M7 18h1"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Manufacturing</h3>
              <p className="text-muted-foreground">
                Ensure optimal production conditions with secure monitoring
                systems
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border group hover:shadow-md transition-all hover:border-brand-teal/50">
            <CardContent className="p-6 pt-6">
              <div className="bg-brand-blue/10 p-4 rounded-lg mb-4 group-hover:bg-brand-blue/20 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-brand-blue"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Supply Chain</h3>
              <p className="text-muted-foreground">
                Track temperature-sensitive goods throughout the logistics
                network
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
