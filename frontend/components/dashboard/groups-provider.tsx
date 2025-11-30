"use client";

import React, { createContext, useContext } from "react";
import { useGroupsData } from "@/hooks/use-groups-data";
import { Group } from "@/lib/api";
import { UserResource } from "@clerk/types";

interface GroupsContextType {
    groups: Group[];
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>;
    loading: boolean;
    error: string | null;
    isLoaded: boolean;
    user: UserResource | null | undefined;
    refreshGroups: () => Promise<void>;
}

const GroupsContext = createContext<GroupsContextType | undefined>(undefined);

export function GroupsProvider({ children }: { children: React.ReactNode }) {
    const groupsData = useGroupsData();

    return (
        <GroupsContext.Provider value={groupsData}>
            {children}
        </GroupsContext.Provider>
    );
}

export function useGroupsContext() {
    const context = useContext(GroupsContext);
    if (context === undefined) {
        throw new Error("useGroupsContext must be used within a GroupsProvider");
    }
    return context;
}
