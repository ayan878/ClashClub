import { createRoute } from "@tanstack/react-router";
import Wingo from "@/user/ColorGame/Wingo";
import { colorGameRoute } from "./colorGameRoute";


export const wingoGameRoute = createRoute({
  getParentRoute: () => colorGameRoute,
  path: "wingo-game",
  component: Wingo,
});

