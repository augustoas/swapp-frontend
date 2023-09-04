import BaseService from '@/services/baseService';
import { ClientAPI } from '@/api/clients/client.d';
import { AuthConfigurationService } from './index.d';

class AuthService extends BaseService implements AuthConfigurationService {

  constructor(api: ClientAPI) {
    super(api);
    this.api = api;
  }

  login<R>() {
    return this.api.get<R>(``);
  }

  loginGoogle<R>() {
    return this.api.get<R>(`/google`);
  }
}

export default AuthService;
