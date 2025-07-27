import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";
import Wingo from "@/user/ColorGame/Wingo";


export const colorGameRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/color-game",
});

