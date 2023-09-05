import router from "@/router";

export function addInterceptors(axiosClient) {
  axiosClient.interceptors.request.use(authInterceptor);

  axiosClient.interceptors.response.use(
    (successRes) => successRes,
    responseErrorInterceptor
  );
}

function authInterceptor(config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  config.headers.Accept = "Application/json";

  return config;
}

function responseErrorInterceptor(error) {
  if (error.response.status === 403) {
    router.push({ name: "Error403" });

    return Promise.reject(error);
  }

  return Promise.reject(error);
}
