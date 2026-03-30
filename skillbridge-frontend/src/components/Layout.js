import React, { useContext, useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  Target,
  User,
  LogOut,
  LayoutDashboard,
  Briefcase,
  BookOpen,
  ChartNoAxesCombined,
  Map,
  X,
} from "lucide-react";
import Chatbot from "./Chatbot";
import { AuthContext } from "../context/AuthContext";

function Layout({ children }) {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigation = useMemo(
    () => [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/roles", label: "Roles", icon: Briefcase },
      { to: "/career-roadmap", label: "Roadmap", icon: Map },
      { to: "/resources", label: "Resources", icon: BookOpen },
      { to: "/progress", label: "Progress", icon: ChartNoAxesCombined },
      { to: "/profile", label: "Profile", icon: User },
    ],
    []
  );

  const handleLogout = () => {
    auth.logout();
    navigate("/login");
  };

  const NavItems = ({ mobile = false }) => (
    <div className={mobile ? "grid gap-2" : "hidden lg:flex items-center gap-2"}>
      {navigation.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={() => setMobileOpen(false)}
          className={({ isActive }) =>
            [
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
              isActive
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                : "text-slate-600 hover:bg-white hover:text-slate-900",
              mobile ? "w-full justify-start" : "",
            ].join(" ")
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_12%_18%,_rgba(255,255,255,0.9)_0px,_transparent_2px),radial-gradient(circle_at_82%_14%,_rgba(191,219,254,0.75)_0px,_transparent_2px),radial-gradient(circle_at_68%_22%,_rgba(255,255,255,0.7)_0px,_transparent_2px),radial-gradient(circle_at_top_right,_rgba(96,165,250,0.16),_transparent_24%),radial-gradient(circle_at_top_left,_rgba(255,255,255,0.5),_transparent_18%),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)] text-foreground">
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight">SkillBridge</div>
              <div className="text-xs text-slate-500">AI-guided career planning</div>
            </div>
          </Link>

          <NavItems />

          <div className="hidden items-center gap-3 lg:flex">
          
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

          <button
            onClick={() => setMobileOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden">
            <NavItems mobile />
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  {auth.user?.name || "Learner"}
                </div>
                <div className="text-xs text-slate-500">{auth.user?.email || ""}</div>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full bg-red-50 px-4 py-2 text-sm font-medium text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      <Chatbot />
    </div>
  );
}

export default Layout;