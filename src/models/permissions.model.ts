export type AccessScopeLevel = "ALL" | "SPECIFIC" | "NONE";

export interface IEntityScope {
  scope: AccessScopeLevel;
  entityIds: string[];
}

export interface IMembershipListItem {
  membershipId: string;
  organizationId: string;
  organizationName: string;
  status: string;
}

export interface IResolvedPermissionsResponse {
  membershipId: string | null;
  organizationId: string | null;
  permissions: string[];
  isSuperAdmin: boolean;
  scopes: {
    company: IEntityScope;
    person: IEntityScope;
  };
  effectiveUntil: string;
  version: number;
}
