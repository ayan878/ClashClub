import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";
import UserLayout from "@/layout/UserLayout";
import ProfilePage from "@/user/pages/ProfilePage";

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/user/profile",
  component: () => (
    <UserLayout>
      <ProfilePage />
    </UserLayout>
  ),
});
