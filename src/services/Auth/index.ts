import BaseService from "@/services/baseService";
import { ClientAPI } from "@/api/clients/client.d";
import { AuthConfigurationService } from "./index.d";

class AuthService extends BaseService implements AuthConfigurationService {
  private endpoint = "/auth";

  constructor(api: ClientAPI) {
    super(api);
    this.api = api;
  }

  signIn<T, R>(payload: T) {
    return this.api.post<R>(`${this.endpoint}/signin`, payload);
  }

  signUp<T, R>(payload: T) {
    return this.api.post<R>(`${this.endpoint}/signup`, payload);
  }
}

export default AuthService;
