import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { fetchGroups, Group } from "@/lib/api";

export function useGroupsData() {
  const { getToken, isLoaded: authLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshGroups = async () => {
    if (!authLoaded || !userLoaded) return;
    try {
      const token = await getToken();
      const { data, error, status } = await fetchGroups(token);

      if (status === 401) {
        setError("Unauthorized");
        setGroups([]);
        return;
      }

      if (error) {
        setError(error);
        setGroups([]);
        return;
      }

      setGroups(data || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load groups");
    }
  };

  useEffect(() => {
    if (!authLoaded || !userLoaded) return;

    (async () => {
      try {
        setLoading(true);
        await refreshGroups();
      } finally {
        setLoading(false);
      }
    })();
  }, [getToken, authLoaded, userLoaded]);

  return {
    groups,
    setGroups,
    loading,
    error,
    isLoaded: authLoaded && userLoaded,
    user,
    refreshGroups,
  };
}
