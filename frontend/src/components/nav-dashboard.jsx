import { LayoutDashboard } from "lucide-react";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

export function NavDashboard() {
  return (
    <SidebarMenuButton asChild>
      <Link
        to="/admin/dashboard"
        activeProps={{
          className: "font-bold",
        }}
      >
        <LayoutDashboard /> 
        <span>Dashboard</span>
      </Link>
    </SidebarMenuButton>
  );
}
