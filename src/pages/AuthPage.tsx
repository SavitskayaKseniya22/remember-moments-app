import React from "react";
import { MainContent } from "../components/MainContent";
import { AuthForm } from "../components/AuthForm";

export function AuthPage({ type }: { type: string }) {
  return (
    <MainContent>
      <AuthForm type={type} />
    </MainContent>
  );
}

export default AuthPage;
