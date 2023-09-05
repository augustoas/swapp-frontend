export type AuthConfigurationService = {
  login: <R>() => Promise<ClientResponse<R>>;
  loginGoogle: <R>() => Promise<ClientResponse<R>>;
};
