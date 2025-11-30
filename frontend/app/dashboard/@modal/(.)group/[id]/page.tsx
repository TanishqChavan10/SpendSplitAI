"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { GroupExpandedView } from "@/components/group/group-expanded-view";
import { Group } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGroupsContext } from "@/components/dashboard/groups-provider";

export default function InterceptedGroupPage() {
  const router = useRouter();
  const params = useParams();
  const rawId = params?.id;

  // 🔒 Safe param parsing
  const id = rawId ? Number(rawId) : null;

  const { groups, loading: groupsLoading, refreshGroups } = useGroupsContext();
  const { getToken } = useAuth();

  // STATE
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"transactions" | "members">(
    "transactions"
  );

  // Find group from context
  const groupFromContext = groups.find((g) => g.id === id);

  useEffect(() => {
    getToken().then(setToken);
  }, [getToken]);

  /* -----------------------------------------
      LOADING STATE
  ------------------------------------------ */

  if (groupsLoading && !groupFromContext) {
    return (
      <Dialog open={true} onOpenChange={() => router.push("/dashboard")}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <DialogTitle className="sr-only">Loading Group</DialogTitle>
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  /* -----------------------------------------
      NOT FOUND
  ------------------------------------------ */

  if (!groupFromContext && !groupsLoading) {
    return (
      <Dialog open={true} onOpenChange={() => router.push("/dashboard")}>
        <DialogContent className="max-w-md">
          <div className="text-center p-6">
            <DialogTitle className="text-xl font-bold mb-2">
              Group Not Found
            </DialogTitle>
            <p className="text-muted-foreground">
              The requested group does not exist.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!groupFromContext) return null;

  /* -----------------------------------------
      SUCCESS
  ------------------------------------------ */

  return (
    <GroupExpandedView
      id={groupFromContext.id.toString()}
      name={groupFromContext.name}
      memberCount={groupFromContext.memberCount}
      lastActivity={groupFromContext.lastActivity}
      minFloor={groupFromContext.min_floor}
      active={true}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onClose={() => router.push("/dashboard")}
      animateInitial={false}
      token={token}
      onExpenseUpdate={() => {}} // Context updates happen via other means or we can trigger refetch
      ownerId={groupFromContext.owner_id}
      refreshData={refreshGroups}
    />
  );
}
