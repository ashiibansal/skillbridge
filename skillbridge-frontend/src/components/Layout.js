import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          SkillBridge
        </Link>

        <div className="space-x-4">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/roles">Roles</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/progress">Progress</Link>
        </div>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
}

export default Layout;