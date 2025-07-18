import { createRoute } from "@tanstack/react-router";
import { userRoute } from "./userRoute";
import Aviator from "@/user/pages/Aviator";

export const aviatorRoute = createRoute({
  getParentRoute: () => userRoute,
  path: "game/avitor",
  component: Aviator, 
});
