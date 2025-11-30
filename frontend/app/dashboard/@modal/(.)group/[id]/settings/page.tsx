"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { GroupExpandedView } from "@/components/group/group-expanded-view";
import { useGroupsContext } from "@/components/dashboard/groups-provider";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Group } from "@/lib/api";

export default function GroupSettingsPage() {
  const router = useRouter();
  const params = useParams();
  const rawId = params?.id;
  const id = rawId ? Number(rawId) : null;

  const { groups, loading: groupsLoading } = useGroupsContext();
  const [activeTab, setActiveTab] = useState<"transactions" | "members">(
    "transactions"
  );

  // Find group from context
  const group = groups.find((g: Group) => g.id === id);

  if (groupsLoading && !group) {
    return (
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <DialogTitle className="sr-only">Loading Group Settings</DialogTitle>
          <div className="p-6 space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!group) {
    return null;
  }

  return (
    <GroupExpandedView
      id={group.id.toString()}
      name={group.name}
      memberCount={group.memberCount}
      lastActivity={group.lastActivity}
      minFloor={group.min_floor}
      active={true}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onClose={() => router.back()}
      view="settings"
      ownerId={group.owner_id}
    />
  );
}
