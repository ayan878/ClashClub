import { adminRoute } from "./admin/adminRoute";
import { dashboardRoute } from "./admin/dashboardRoute";
import { loginRoute } from "./loginRoute";
import { pendingRechargeRoute } from "./admin/pendingHistoryRoute";
import { indexRoute } from "./indexRoute";
import { rootRoute } from "./rootRoute";
import { depositHistoryRoute } from "./admin/depositHistoryRoute";
import { withdrawHistoryRoute } from "./admin/withdrawHistoryRoute";
import { userRoute } from "./user/userRoute";
import { aviatorRoute } from "./user/aviatorRoute";


// Nest dashboard under admin
const adminTree = adminRoute.addChildren([
  dashboardRoute,
  pendingRechargeRoute,
  depositHistoryRoute,
  withdrawHistoryRoute,
]);

const userTree = userRoute.addChildren([
aviatorRoute,
]);

// Add all top-level children to root
export const routeTree = rootRoute.addChildren([
  indexRoute,
  adminTree,
  userTree,
  loginRoute,
]);
