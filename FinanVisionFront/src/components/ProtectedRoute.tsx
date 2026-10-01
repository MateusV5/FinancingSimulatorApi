import { useAuth } from "@/context/AuthContext";
import { Redirect } from "wouter";
import { LoadingSpinner } from "./LoadingSpinner";

export function ProtectedRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return <Component {...rest} />;
}
