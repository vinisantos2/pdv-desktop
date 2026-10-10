import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";

import "./dashboard.css";
import FooterDashBoard from "./components/FooterDashBoard/FooterDashboard";

export default function Dashboard() {
  return (
    <div className="main-layout">
      <Sidebar />

      <div className="main-area">
        <main className="main-content">
          <Outlet />
        </main>
        <FooterDashBoard />
      </div>
    </div>
  );
}
