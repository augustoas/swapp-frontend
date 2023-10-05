import AxiosApi from '../axiosApiAuth';
import { ClientResponse } from "@/api/clients/client.d";
import { Resource } from '../../types/resource';

export default abstract class ResourceFactory {
  protected axiosApi = new AxiosApi();
  protected resource: Resource;
  protected url: string;

  constructor(resource: Resource) {
    this.resource = resource;
    this.url = `/${this.resource}`;
  }

  abstract create<T>(data: Object, config?: Object): Promise<ClientResponse<T>>;
  abstract findOne<T>(id: number, config?: Object): Promise<ClientResponse<T>>;
  abstract findAll<T>(config?: Object): Promise<ClientResponse<T[]>>;
  abstract update<T>(id: number, data: Object, config?: Object): Promise<ClientResponse<T>>;
  abstract delete<T>(id: number, config?: Object): Promise<ClientResponse<T>>;
}