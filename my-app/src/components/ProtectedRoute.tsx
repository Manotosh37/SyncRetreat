"use client";
import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';

import { useAuth } from "../lib/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else if (!isLoading && requireAdmin && user?.user_metadata?.role !== "admin") {
      router.push("/");
    }
  }, [user, isLoading, requireAdmin, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fefbf7]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requireAdmin && user.user_metadata?.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}
