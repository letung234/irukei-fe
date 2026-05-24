"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "@/context/AuthContext";
import tokenService from "@/services/token.service";
import permissionsApi from "@/services/permissions.service";
import membershipStorage from "@/services/membership-storage";
import { getApiErrorMessage } from "@/utils/error";
import type { IMembershipListItem, IResolvedPermissionsResponse } from "@/models/permissions.model";

interface IPermissionContextValue {
  memberships: IMembershipListItem[];
  selectedMembershipId: string | null;
  setSelectedMembershipId: (id: string | null) => Promise<void>;
  permissionsPayload: IResolvedPermissionsResponse | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  hasPermission: (key: string) => boolean;
}

const PermissionContext = createContext<IPermissionContextValue | null>(null);
PermissionContext.displayName = "PermissionContext";

export function PermissionProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const [memberships, setMemberships] = useState<IMembershipListItem[]>([]);
  const [selectedMembershipId, setSelectedState] = useState<string | null>(null);
  const [permissionsPayload, setPermissionsPayload] =
    useState<IResolvedPermissionsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = useCallback(async (membershipId: string | null) => {
    if (!membershipId) {
      setPermissionsPayload(null);
      return;
    }
    const perm = await permissionsApi.getPermissions(membershipId);
    setPermissionsPayload(perm);
  }, []);

  const setSelectedMembershipId = useCallback(
    async (id: string | null) => {
      setSelectedState(id);
      membershipStorage.set(id);
      setIsLoading(true);
      setError(null);
      try {
        await fetchPermissions(id);
      } catch (e: unknown) {
        setError(getApiErrorMessage(e, "Failed to load permissions"));
        setPermissionsPayload(null);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchPermissions],
  );

  const load = useCallback(async () => {
    if (!user || !tokenService.isAuthenticated()) {
      setMemberships([]);
      setPermissionsPayload(null);
      setSelectedState(null);
      membershipStorage.set(null);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const list = await permissionsApi.listMemberships();
      setMemberships(list);

      const stored = membershipStorage.get();
      const storedValid = stored && list.some((m) => m.membershipId === stored);
      const chosen = storedValid ? stored : list[0]?.membershipId ?? null;
      if (chosen) membershipStorage.set(chosen);
      setSelectedState(chosen);
      await fetchPermissions(chosen);
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to load permissions"));
      setPermissionsPayload(null);
    } finally {
      setIsLoading(false);
    }
  }, [user, fetchPermissions]);

  useEffect(() => {
    if (authLoading) return;
    void load();
  }, [authLoading, user, load]);

  const hasPermission = useCallback(
    (key: string) => {
      if (!permissionsPayload) return false;
      if (permissionsPayload.isSuperAdmin) return true;
      return permissionsPayload.permissions.includes(key);
    },
    [permissionsPayload],
  );

  const value = useMemo<IPermissionContextValue>(
    () => ({
      memberships,
      selectedMembershipId,
      setSelectedMembershipId,
      permissionsPayload,
      isLoading,
      error,
      refetch: load,
      hasPermission,
    }),
    [
      memberships,
      selectedMembershipId,
      setSelectedMembershipId,
      permissionsPayload,
      isLoading,
      error,
      load,
      hasPermission,
    ],
  );

  return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}

export function usePermissions(): IPermissionContextValue {
  const ctx = useContext(PermissionContext);
  if (!ctx) {
    throw new Error("usePermissions must be used within <PermissionProvider>");
  }
  return ctx;
}
