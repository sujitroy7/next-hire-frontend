import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { login, logout } from "@/store/thunks/authThunk";
import { useCallback } from "react";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  // Select only the parts of the state we need
  const { isAuthenticated, loading, error } = useAppSelector(
    (state) => state.auth,
  );
  // const user = useAppSelector(
  //     (state) => state.auth.user,
  //   );

  const handleLogout = useCallback(() => {
    dispatch(logout());
    // Optional: Redirect to login or clear other local storage if needed
    window.location.href = "/login";
  }, [dispatch]);

  return {
    // user,
    isAuthenticated,
    isLoading: loading,
    error,
    login: (credentials: { email: string; password: string }) =>
      dispatch(login(credentials)),
    logout: handleLogout,
  };
};
