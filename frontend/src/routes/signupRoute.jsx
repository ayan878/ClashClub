import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import SignUp from "@/user/pages/SignUp";

export const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: SignUp,
});
