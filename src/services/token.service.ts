import Cookies from "js-cookie";
import { IAuthUser, ITokenPair } from "@/models/auth.model";
import { TOKEN_KEYS } from "@/constants";

const COOKIE_EXPIRES_DAYS = 1;

/**
 * TokenService
 * Manages access token, refresh token, and user info in cookies.
 * Mirrors irukei's AuthService.storeAuthInCookie / getAuthFromCookie.
 *
 * Using cookies (not localStorage) so Next.js middleware can read them
 * server-side to protect routes.
 */
const tokenService = {
  saveTokens(tokens: ITokenPair): void {
    Cookies.set(TOKEN_KEYS.ACCESS_TOKEN, tokens.accessToken, {
      expires: COOKIE_EXPIRES_DAYS,
      sameSite: "Lax",
    });
    Cookies.set(TOKEN_KEYS.REFRESH_TOKEN, tokens.refreshToken, {
      expires: 7, // refresh token lives 7 days (longer)
      sameSite: "Lax",
    });
  },

  saveUser(user: IAuthUser): void {
    Cookies.set(TOKEN_KEYS.USER, JSON.stringify(user), {
      expires: COOKIE_EXPIRES_DAYS,
      sameSite: "Lax",
    });
  },

  getAccessToken(): string | undefined {
    return Cookies.get(TOKEN_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken(): string | undefined {
    return Cookies.get(TOKEN_KEYS.REFRESH_TOKEN);
  },

  getUser(): IAuthUser | null {
    const raw = Cookies.get(TOKEN_KEYS.USER);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as IAuthUser;
    } catch {
      return null;
    }
  },

  clearAll(): void {
    Cookies.remove(TOKEN_KEYS.ACCESS_TOKEN);
    Cookies.remove(TOKEN_KEYS.REFRESH_TOKEN);
    Cookies.remove(TOKEN_KEYS.USER);
  },

  isAuthenticated(): boolean {
    return Boolean(this.getAccessToken());
  },
};

export default tokenService;
