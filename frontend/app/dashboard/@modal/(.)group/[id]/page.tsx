"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { GroupExpandedView } from "@/components/group/group-expanded-view";
import { fetchGroup, Group } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth, useUser } from "@clerk/nextjs";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function InterceptedGroupPage() {
  const { getToken, isLoaded: authLoaded } = useAuth();
  const { isLoaded: userLoaded } = useUser();
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string, 10);

  const [activeTab, setActiveTab] = useState<"transactions" | "members">(
    "transactions"
  );
  const [group, setGroup] = useState<Group | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !authLoaded || !userLoaded) return;

    (async () => {
      try {
        setLoading(true);
        setError(null);
        const token = await getToken();
        const data = await fetchGroup(id, token);
        setGroup(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load group");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, getToken, authLoaded, userLoaded]);

  // Show loading skeleton while auth or data is loading
  if (!authLoaded || !userLoaded || loading) {
    return (
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
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

  if (error) {
    return (
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent className="max-w-md">
          <div className="text-center p-6">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
              Error
            </h2>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!group) {
    return (
      <Dialog open={true} onOpenChange={() => router.back()}>
        <DialogContent className="max-w-md">
          <div className="text-center p-6">
            <h2 className="text-xl font-bold mb-2">Group Not Found</h2>
            <p className="text-muted-foreground">
              The requested group could not be found.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <GroupExpandedView
      id={group.id.toString()}
      name={group.name}
      memberCount={group.memberCount}
      lastActivity={group.lastActivity}
      active={true}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onClose={() => router.back()}
      animateInitial={false}
    />
  );
}
