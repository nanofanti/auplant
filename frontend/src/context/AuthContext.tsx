import { createContext, useContext, useEffect, useState } from "react";

import type { ReactNode } from "react";

import { getMe, logout as logoutService } from "../services/authService";
import { getMySitterProfile } from "../services/sitterService";

import type { AuthUser } from "../types/Auth";
import type { PlantSitter } from "../types/PlantSitter";

type AuthContextType = {
  user: AuthUser | null;
  sitterProfile: PlantSitter | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  loading: boolean;
  logout: () => Promise<void>;
  refreshSitterProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [sitterProfile, setSitterProfile] = useState<PlantSitter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshSitterProfile = async () => {
    try {
      const response = await getMySitterProfile();

      if (response) {
        setSitterProfile(response.data);
      } else {
        setSitterProfile(null);
      }
    } catch (error) {
      console.error("Failed to load sitter profile:", error);
      setSitterProfile(null);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getMe();

        setUser(response.data);

        await refreshSitterProfile();
      } catch (error) {
        console.error("Auth check failed:", error);

        setUser(null);
        setSitterProfile(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    await logoutService();

    setUser(null);
    setSitterProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        sitterProfile,
        setUser,
        loading,
        logout,
        refreshSitterProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
