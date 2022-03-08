export class AuthService {
  private static getTokenLocalStorageKey(): string {
    return "accessToken";
  }

  static setToken(token?: string): void {
    if (token) {
      localStorage.setItem(AuthService.getTokenLocalStorageKey(), token);
    } else {
      localStorage.removeItem(AuthService.getTokenLocalStorageKey());
    }
  }

  static getToken(): string | undefined {
    const token = localStorage.getItem(AuthService.getTokenLocalStorageKey());

    if (!token) {
      return undefined;
    }

    return token;
  }
}
