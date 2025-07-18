// routes/admin/pendingRechargeRoute.tsx
import { createRoute } from "@tanstack/react-router";
import { adminRoute } from "./adminRoute";
import { DepositHistory } from "@/admin/pages/DepositHistory";

export const depositHistoryRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/deposit-history",
  component: DepositHistory,
});
