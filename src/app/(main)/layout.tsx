import { Footer } from "@/components/global/footer";
import { Navbar } from "@/components/global/navbar";
import React, { PropsWithChildren } from "react";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
