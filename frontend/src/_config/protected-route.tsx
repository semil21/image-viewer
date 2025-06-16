"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/_components/loader/loader";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const router = useRouter();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
    }
  }, [router]);

  setTimeout(() => {
    setIsCheckingAuth(false);
  }, 1000);

  if (isCheckingAuth) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
