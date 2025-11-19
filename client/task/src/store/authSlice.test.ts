import authReducer, { login, logout } from "./authSlice";

describe("authSlice", () => {
  test("should return initial state", () => {
    const result = authReducer(undefined, { type: "@@INIT" });
    expect(result.isLoggedIn).toBe(false);
  });

  test("should handle login", () => {
    const initialState = { isLoggedIn: false };
    const result = authReducer(initialState, login());
    expect(result.isLoggedIn).toBe(true);
  });

  test("should handle logout", () => {
    const initialState = { isLoggedIn: true };
    const result = authReducer(initialState, logout());
    expect(result.isLoggedIn).toBe(false);
  });
});
