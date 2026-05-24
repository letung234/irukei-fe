import httpClient from "./http-client";
import type { IMembershipListItem, IResolvedPermissionsResponse } from "@/models/permissions.model";

/** HTTP-only client for `/v1/me/*` permission endpoints (no browser storage here). */
const permissionsApi = {
  async listMemberships(): Promise<IMembershipListItem[]> {
    const { data } = await httpClient.get<IMembershipListItem[]>("/v1/me/memberships");
    return data;
  },

  async getPermissions(membershipId?: string | null): Promise<IResolvedPermissionsResponse> {
    const params = membershipId ? { membershipId } : undefined;
    const { data } = await httpClient.get<IResolvedPermissionsResponse>("/v1/me/permissions", {
      params,
    });
    return data;
  },
};

export default permissionsApi;
