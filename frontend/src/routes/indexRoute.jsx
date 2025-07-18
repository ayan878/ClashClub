import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import UserLayout from "@/layout/UserLayout";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/home", 
  component: UserLayout,
});
