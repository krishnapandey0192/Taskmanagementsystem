import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const ProtectedRoute = ({ allowedRole }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const user = JSON.parse(localStorage.getItem("user"));

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};

export default ProtectedRoute;
