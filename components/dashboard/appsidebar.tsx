"use client"

import React, { useEffect, useState } from "react"
import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Mail,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar"

type MenuItem = {
    title: string
    url: string
    icon: React.ElementType
}

const DEFAULT_ITEMS: MenuItem[] = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Inbox", url: "#", icon: Inbox },
    { title: "Invoice", url: "/invoice", icon: Calendar },
    { title: "About", url: "/aboutus", icon: Search },
    { title: "Settings", url: "/settings", icon: Settings },
]

export type AppSidebarProps = {
    items?: MenuItem[]
    userEmail?: string
    onLogout?: () => void
    storageKey?: string
    initialCollapsed?: boolean
}

/**
 * AppSidebar
 * - collapsible (persisted in localStorage)
 * - keyboard accessible toggle
 * - shows user email and logout button in footer
 */
export function AppSidebar({
    items = DEFAULT_ITEMS,
    userEmail = "",
    onLogout = () => console.warn("onLogout not provided"),
    storageKey = "app-sidebar-collapsed",
    initialCollapsed = false,
}: AppSidebarProps) {
    const [collapsed, setCollapsed] = useState<boolean>(initialCollapsed)

    useEffect(() => {
        try {
            const raw = localStorage.getItem(storageKey)
            if (raw !== null) setCollapsed(raw === "true")
        } catch {
            // ignore storage errors (e.g., SSR)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, String(collapsed))
        } catch {
            // ignore
        }
    }, [collapsed, storageKey])

    const toggle = () => setCollapsed((s) => !s)

    const widthClass = collapsed ? "w-16" : "w-64"
    const labelOpacity = collapsed ? "opacity-0 pointer-events-none w-0" : "opacity-100"

    return (
        <SidebarProvider>
            <Sidebar
                side="left"
                className={`h-screen transition-all duration-200 ease-in-out border-r bg-white ${widthClass} shrink-0`}
                role="navigation"
                aria-label="Main"
            >
                <SidebarHeader className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold select-none">{!collapsed ? "Logo " : "logo "}</span>
                    </div>

                    <button
                        type="button"
                        onClick={toggle}
                        aria-pressed={collapsed}
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        className="inline-flex items-center justify-center p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        title={collapsed ? "Expand" : "Collapse"}
                    >
                        <span className="sr-only">{collapsed ? "Expand sidebar" : "Collapse sidebar"}</span>
                        <ChevronLeft
                            className={`transition-transform duration-200 ${collapsed ? "rotate-180" : "rotate-0"}`}
                            size={18}
                        />
                    </button>
                </SidebarHeader>

                <SidebarContent className="px-2">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="space-y-1">
                                {items.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a
                                                    href={item.url}
                                                    title={collapsed ? item.title : undefined}
                                                    className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <Icon size={18} aria-hidden />
                                                    <span
                                                        className={`text-sm transition-opacity duration-150 ${labelOpacity}`}
                                                        aria-hidden={collapsed}
                                                    >
                                                        {item.title}
                                                    </span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="mt-auto px-2 py-3">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <Mail size={16} />
                            <span
                                className={`text-sm truncate max-w-[10rem] transition-all duration-150 ${labelOpacity}`}
                                title={userEmail}
                                aria-hidden={collapsed}
                            >
                                {userEmail || "not signed in"}
                            </span>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={onLogout}
                                title="Logout"
                                className="inline-flex items-center justify-center p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    </div>
                </SidebarFooter>
            </Sidebar>
        </SidebarProvider>
    )
}