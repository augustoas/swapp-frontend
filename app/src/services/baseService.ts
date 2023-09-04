import { ClientAPI } from '@/api/clients/client.d';

export default class BaseService {
  protected api: ClientAPI;

  constructor(api: ClientAPI) {
    this.api = api;
  }
}
