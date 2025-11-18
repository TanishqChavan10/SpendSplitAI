import DashHeader from "@/components/dashboard/DashHeader";
import { EmptyGroupsState } from "@/components/dashboard/EmptyGroupsState";

export default function DashBoard() {
  // Mock data - replace with actual state management
  const hasGroups = false; // Set to true when user has groups

  return (
    <div className="flex flex-col h-full">
      <DashHeader />
      <main className="flex-1 overflow-auto flex items-center justify-center p-4">
        {!hasGroups ? (
          <EmptyGroupsState />
        ) : (
          /* Groups list will go here when hasGroups is true */
          <div className="space-y-4">{/* Your groups content */}</div>
        )}
      </main>
    </div>
  );
}
