export type AuthConfigurationService = {
  signIn: <T, R>(payload: T) => Promise<ClientResponse<R>>;
  signUp: <T, R>(payload: T) => Promise<ClientResponse<R>>;
};
