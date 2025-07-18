// routes/admin/pendingRechargeRoute.tsx
import { createRoute } from "@tanstack/react-router";
import { adminRoute } from "./adminRoute";
import PendingRecharge from "@/admin/pages/PendingRecharge";

export const pendingRechargeRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/pending-recharge",
  component: PendingRecharge,
});
