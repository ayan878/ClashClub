import UserLayout from "@/layout/UserLayout";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";

export const userRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user",
  component: UserLayout,
});
