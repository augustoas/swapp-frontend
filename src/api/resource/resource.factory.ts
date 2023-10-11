import AxiosApi from '../axiosApiAuth';
import { ClientResponse } from "@/api/clients/client.d";
import { Resource } from '../../types/resource';

export default abstract class ResourceFactory<T> {
  protected axiosApi = new AxiosApi();
  protected resource: Resource;
  protected url: string;

  constructor(resource: Resource) {
    this.resource = resource;
    this.url = `/backend/${this.resource}`;
  }

  abstract create(data: Object, config?: Object): Promise<ClientResponse<T>>;
  abstract findOne(id: number, config?: Object): Promise<ClientResponse<T>>;
  abstract findAll(config?: Object): Promise<ClientResponse<T[]>>;
  abstract update(id: number, data: Object, config?: Object): Promise<ClientResponse<T>>;
  abstract delete(id: number, config?: Object): Promise<ClientResponse<T>>;
}