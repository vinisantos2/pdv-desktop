import SidebarHeader from "../SidebarHeader/SidebarHeader";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import SidebarUsuario from "../SidebarUsuario/SidebarUsuario";

import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">

      <SidebarHeader />

      <SidebarMenu />

      <SidebarUsuario />

    </aside>
  );
}