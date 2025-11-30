import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { GroupsProvider } from "@/components/dashboard/groups-provider";

export default function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <GroupsProvider>
      <div className="h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col overflow-hidden">
          {children}
          {modal}
        </div>
      </div>
    </GroupsProvider>
  );
}
