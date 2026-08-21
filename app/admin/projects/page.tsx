import type { Metadata } from "next";
import AdminProjectsView from "@/components/admin/AdminProjectsView";

export const metadata: Metadata = {
  title: "Admin — Projects",
  description: "Manage DigitalYarr portfolio projects",
  robots: { index: false, follow: false },
};

export default function AdminProjectsPage() {
  return <AdminProjectsView />;
}
