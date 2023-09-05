import { ClientAPI } from "@/api/clients/client.d";

export default abstract class {
  protected provider: ClientAPI;

  constructor(provider: ClientAPI) {
    this.provider = provider;
  }
}
