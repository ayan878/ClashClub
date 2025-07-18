import RootLayout from "@/layout/RootLayout";
import { Outlet } from "@tanstack/react-router";
import { createRootRoute } from "@tanstack/react-router";


export const rootRoute = createRootRoute({
  component: () => (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ),
});
