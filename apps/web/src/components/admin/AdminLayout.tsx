import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../lib/auth";
import { useToast } from "../../components/ui/Toast";

const nav = [
  { to: "/admin", label: "Dashboard" },
  { to: "/admin/profile", label: "Profile" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/experience", label: "Experience" },
  { to: "/admin/skills", label: "Skills" },
  { to: "/admin/education", label: "Education" },
  { to: "/admin/certifications", label: "Certifications" },
  { to: "/admin/messages", label: "Messages" },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    show("Logged out");
    navigate("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="hidden w-60 shrink-0 border-r border-border bg-surface md:block">
        <div className="px-5 py-6">
          <p className="text-sm font-semibold text-text">Portfolio CMS</p>
          <p className="mt-1 text-xs text-muted">{user?.email}</p>
        </div>
        <nav className="px-3">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/admin"}
              className={({ isActive }) =>
                `mb-1 block rounded-md px-3 py-2 text-sm ${
                  isActive ? "bg-accent-soft text-accent" : "text-muted hover:text-text"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 py-6">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted hover:text-text"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>
      <div className="flex-1">
        <header className="border-b border-border bg-surface px-6 py-4 md:hidden">
          <p className="text-sm font-semibold">Portfolio CMS</p>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}