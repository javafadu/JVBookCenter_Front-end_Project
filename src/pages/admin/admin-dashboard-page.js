import React from "react";
import Dashboard from "../../components/admin/dashboard/dashboard";
import SectionTitle from "../../components/general/section-title/section-title";

const AdminDashboardPage = () => {
  return (
    <>
      <SectionTitle title="Dashboard" />
      <Dashboard />
    </>
  );
};

export default AdminDashboardPage;
