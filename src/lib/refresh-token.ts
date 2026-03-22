import { publicRoutes } from "./routes";

let timer: NodeJS.Timeout;

export const setRefreshTokenLoopTimer = (newTimer: NodeJS.Timeout) => {
  timer = newTimer;
};

export const getRefreshTokenLoopTimer = () => {
  return timer;
};

export const clearRefreshTokenLoopTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

export const refreshTokenLoop = async () => {
  const { store } = await import("@/store/store");
  const { refreshAccessToken } = await import("@/store/thunks/authThunk");
  return new Promise((resolve, reject) => {
    store
      .dispatch(refreshAccessToken())
      .unwrap()
      .then((expiresAt) => {
        const time = expiresAt - (Date.now() + 1000 * 60);
        timer = setTimeout(refreshTokenLoop, time);
        resolve(expiresAt);
      })
      .catch((error) => {
        const pathname = window.location.pathname;
        const isPublicRoute = publicRoutes.some((routeRegex) =>
          routeRegex.test(pathname),
        );
        if (!isPublicRoute) {
          window.location.href = "/login";
        }
        reject(error);
      });
  });
};
