import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";
import HomePages from "@/user/pages/HomePages";
import UserLayout from "@/layout/UserLayout";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/home",
  component: () => (
    <UserLayout>
      <HomePages />
    </UserLayout>
  ),
});
