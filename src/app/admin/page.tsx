import { AppSidebar } from "@/components/app-sidebar" 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BarGraphComponent } from "./_components/graph"
import { AdminCard } from "./_components/cards"
import { Hourglass, StickyNote, User, UserRoundPlus, Users } from "lucide-react"

export default function AdminPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <AdminCard icon={Users} label="Total Visitors" quantity={246}/>
            <AdminCard icon={StickyNote} label="Borrowed Books" quantity={740}/>
            <AdminCard icon={Hourglass} label="Over Due Books" quantity={34}/>
            <AdminCard icon={UserRoundPlus} label="New Members" quantity={60}/>
            {/* <div className="aspect-video rounded-xl bg-muted/50" /> */}
          </div>
          <div className="min-h-[100vh] w-1/2 flex-1 rounded-xl  md:min-h-min" >
            <BarGraphComponent/>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
