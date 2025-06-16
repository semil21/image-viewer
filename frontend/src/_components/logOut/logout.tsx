"use client";

import { usePathname, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const LogoutButton = () => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  if (pathname === "/" || pathname === "/register") {
    return null;
  }

  const handleLogout = () => {
    queryClient.clear();
    localStorage.removeItem("token");
    queryClient.clear();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 z-50"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
