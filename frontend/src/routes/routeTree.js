import { adminRoute } from "./admin/adminRoute";
import { dashboardRoute } from "./admin/dashboardRoute";
import { pendingRechargeRoute } from "./admin/pendingHistoryRoute";
import { indexRoute } from "./indexRoute";
import { rootRoute } from "./rootRoute";
import { depositHistoryRoute } from "./admin/depositHistoryRoute";
import { withdrawHistoryRoute } from "./admin/withdrawHistoryRoute";
import { userRoute } from "./user/userRoute";
import { aviatorRoute } from "./user/aviatorRoute";
import { homeRoute } from "./homeRoute";
import { signUpRoute } from "./signupRoute";
import { colorGameRoute } from "./user/colorGameRoute";
import { wingoGameRoute } from "./user/wingoGameRoute";

// Nest dashboard under admin
const adminTree = adminRoute.addChildren([
  dashboardRoute,
  pendingRechargeRoute,
  depositHistoryRoute,
  withdrawHistoryRoute,
]);

const userTree = userRoute.addChildren([aviatorRoute]);
const colorGameTree = colorGameRoute.addChildren([wingoGameRoute]);

// Add all top-level children to root
export const routeTree = rootRoute.addChildren([
  // colorGameRoute,
  colorGameTree,
  indexRoute,
  homeRoute,
  signUpRoute,
  adminTree,
  userTree,
]);
