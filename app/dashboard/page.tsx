import { AppSidebar } from "@/components/dashboard/appsidebar";
import DashHeader from "@/components/dashboard/DashHeader";
// import DashHeader from "@/components/dashboard/dashheader";
import { Sidebar } from "lucide-react";
import Image from "next/image";

export default function DashBoard() {
  return (
    <>
      <div className="flex flex-row">
        <AppSidebar />  
        <DashHeader/>
      </div>

    </>
  );
}
