import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartArea,
  Command,
  CreditCard,
  Frame,
  GalleryVerticalEnd,
  Gamepad2,
  Gift,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
  WalletCards,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "ayan878",
    email: "ayan878@examplecom",
    avatar: "/avatars/ayan.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Users",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Super Master",
          url: "#",
        },
        {
          title: "Master",
          url: "#",
        },
        {
          title: "Agent",
          url: "#",
        },
        {
          title: "User",
          url: "#",
        },
      ],
    },
    {
      title: "Transaction Status",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Pending Recharge",
          url: "/admin/pending-recharge",
        },
        {
          title: "Pending Withdraw",
          url: "/admin/pending-withdraw",
        },
      ],
    },
    {
      title: "Transaction History",
      url: "#",
      icon: WalletCards,
      items: [
        {
          title: "Deposit History",
          url: "/admin/deposit-history",
        },
        {
          title: "Withdraw History",
          url: "/admin/withdraw-history",
        },
      ],
    },
    {
      title: "Games",
      url: "#",
      icon: Gamepad2,
      items: [
        {
          title: "Wingo",
          url: "#",
        },
        {
          title: "Sports",
          url: "#",
        },
        {
          title: "Matches",
          url: "#",
        },
        {
          title: "Matches",
          url: "#",
        },
        {
          title: "Matches History",
          url: "#",
        },
      ],
    },
    {
      title: "Market",
      url: "#",
      icon: ChartArea,
      items: [
        {
          title: "Manage Markets",
          url: "#",
        },
        {
          title: "My Market",
          url: "#",
        },
        {
          title: "Manage Fancy",
          url: "#",
        },
        {
          title: "Fancy History",
          url: "#",
        },
      ],
    },
    {
      title: "Bonus",
      url: "#",
      icon: Gift,
      items: [
        {
          title: "Manage Markets",
          url: "#",
        },
        {
          title: "My Market",
          url: "#",
        },
        {
          title: "Manage Fancy",
          url: "#",
        },
        {
          title: "Fancy History",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
