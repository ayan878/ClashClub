import { createRoute } from "@tanstack/react-router";
import { adminRoute } from "./adminRoute";
import WithdrawHistory from "@/admin/pages/WithdrawHistory";

export const withdrawHistoryRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/withdraw-history",
  component: WithdrawHistory,
});
