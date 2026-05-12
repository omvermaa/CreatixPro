import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();
  const adminEmails = process.env.ADMIN_EMAIL?.split(',').map(e => e.trim()) || [];
  
  const isAuthorized = user?.emailAddresses.some(
    (email) => adminEmails.includes(email.emailAddress)
  );

  if (adminEmails.length === 0 || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 border border-gray-200 rounded-sm shadow-sm max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-6">
            <span className="text-red-500 text-2xl font-bold">!</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-8">You are not authorized to view the admin portal. This area is restricted to administrators only.</p>
          <div className="flex flex-col items-center gap-4">
            <Link href="/" className="w-full px-6 py-3 bg-gradient-to-r from-[#B8941F] to-[#9A7B15] text-white font-semibold uppercase tracking-wider hover:brightness-110 transition-all rounded-sm">
              Return Home
            </Link>
            <div className="text-sm text-gray-500 mt-4 flex items-center gap-2">
              Logged in as {user?.emailAddresses[0]?.emailAddress} <UserButton />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900" style={{
      "--background": "#ffffff",
      "--foreground": "#0A0A0A",
      "--card": "#ffffff",
      "--card-foreground": "#0A0A0A",
      "--popover": "#ffffff",
      "--popover-foreground": "#0A0A0A",
      "--primary": "#0A0A0A",
      "--primary-foreground": "#ffffff",
      "--secondary": "#F7F7F7",
      "--secondary-foreground": "#0A0A0A",
      "--muted": "#F3F3F3",
      "--muted-foreground": "#737373",
      "--accent": "#B8941F",
      "--accent-foreground": "#ffffff",
      "--destructive": "#EF4444",
      "--border": "rgba(0,0,0,0.12)",
      "--input": "rgba(0,0,0,0.12)",
      "--ring": "#B8941F"
    } as React.CSSProperties}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shrink-0">
          <h2 className="text-lg font-semibold text-gray-800 pl-12 md:pl-0">Admin Portal</h2>
          <div className="flex items-center gap-4">
            <UserButton />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
