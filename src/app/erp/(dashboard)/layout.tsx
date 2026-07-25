import { ReactNode } from "react";
import Link from "next/link";
import { LayoutDashboard, Receipt, FileCheck2, Users, Settings } from "lucide-react";
import { ERPLanguageSwitcher } from "@/components/erp-language-switcher";

export const metadata = {
  title: "ERP Dashboard | CO EXPORT.ID",
  description: "Internal ERP system for managing export operations.",
};

const navItems = [
  { label: "Dashboard", href: "/erp", icon: LayoutDashboard },
  { label: "Finance", href: "/erp/finance", icon: Receipt },
  { label: "Licensing & Docs", href: "/erp/licensing", icon: FileCheck2 },
  { label: "CRM", href: "/erp/crm", icon: Users },
  { label: "Settings", href: "/erp/settings", icon: Settings },
];

export default function ERPLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col print:hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight">ERP System</h1>
          <p className="text-xs text-slate-400 mt-1">CO EXPORT.ID</p>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                <Icon className="size-5 text-slate-400" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <ERPLanguageSwitcher />
        <div className="p-4 border-t border-slate-800 mt-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="text-sm">
              <p className="font-semibold">Admin</p>
              <p className="text-xs text-slate-400">admin@coexport.id</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shadow-sm z-10 print:hidden">
          <h2 className="text-lg font-semibold text-gray-800">Admin Dashboard</h2>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}