// adminRoute.ts
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";
import AdminLayout from "@/layout/AdminLayout";

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
//   id: "admin",
  path: "/admin",
  component: AdminLayout,
});
