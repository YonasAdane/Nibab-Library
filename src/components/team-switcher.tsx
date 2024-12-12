"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }
}) {

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
                <img className="size-9" src="https://cdn.iconscout.com/icon/free/png-512/free-book-icon-download-in-svg-png-gif-file-formats--education-textbook-paper-learning-university-pack-school-icons-2230792.png?f=webp&w=256" alt="" />
              {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"> */}
                {/* <teams.logo className="size-4" /> */}
              {/* </div> */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {teams.name}
                </span>
                <span className="truncate text-xs">{teams.plan}</span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
       
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
