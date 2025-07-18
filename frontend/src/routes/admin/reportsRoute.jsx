import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";
import AdminLayout from "@/layout/AdminLayout";
// import ReportsPage from "../../admin/pages/ReportsPage";
// import AdminLayout from "../../layouts/AdminLayout";

export const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/reports",
  component: () => (
    <AdminLayout>
      <ReportsPage />
    </AdminLayout>
  ),
});
