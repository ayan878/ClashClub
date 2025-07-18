import { createRoute } from "@tanstack/react-router";
import Login from "@/admin/pages/Login";
import { rootRoute } from "./rootRoute";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Login,
});
