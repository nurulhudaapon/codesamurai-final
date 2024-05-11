import { useStorageState } from "@/hooks/auth";
import React from "react";

type SignInProps = { token: string, userId: string }

const AuthContext = React.createContext<{
  signIn: (props: SignInProps) => void;
  signOut: () => void;
  session?: string | null;
  userId?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  userId: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[sessionLoading, session], setSession] = useStorageState("session");
  const [[userIdLoading, userId], setUserId] = useStorageState("userId");

  return (
    <AuthContext.Provider
      value={{
        signIn: (props: SignInProps) => {
          if (props.token) {
            setSession(props.token);
            setUserId(props.userId);
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        userId,
        isLoading: sessionLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
