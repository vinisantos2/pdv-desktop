import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";

import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="main-layout">
      <Sidebar />

      <div className="main-area">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
