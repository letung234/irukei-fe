const SELECTED_MEMBERSHIP_KEY = "irukei_selected_membership_id";

/** Persists the org/membership the user picked in the dashboard switcher. */
const membershipStorage = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    return sessionStorage.getItem(SELECTED_MEMBERSHIP_KEY);
  },

  set(id: string | null): void {
    if (typeof window === "undefined") return;
    if (id) sessionStorage.setItem(SELECTED_MEMBERSHIP_KEY, id);
    else sessionStorage.removeItem(SELECTED_MEMBERSHIP_KEY);
  },
};

export default membershipStorage;
