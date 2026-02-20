import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { useGetMeQuery } from "@/store/services/userApi";
import { login, logout } from "@/store/thunks/authThunk";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    isAuthenticated,
    loading: isAuthLoading,
    error: authError,
  } = useAppSelector((state) => state.auth);

  const { data, isLoading: isUserLoading } = useGetMeQuery();

  const handleLogout = useCallback(async () => {
    await dispatch(logout());
    router.refresh();
  }, [dispatch]);

  return {
    user: data?.data,
    isAuthenticated,
    isLoading: isAuthLoading || isUserLoading,
    error: authError,
    login: (credentials: { email: string; password: string }) =>
      dispatch(login(credentials)),
    logout: handleLogout,
  };
};
