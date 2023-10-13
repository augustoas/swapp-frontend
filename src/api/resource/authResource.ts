import { Resource, IAuth, IUsers } from '../../types/resource';
import GenericResource from "./genericResource"
import { ClientResponse } from '../clients/client';

export default class CategoriesResource extends GenericResource<IAuth> {
  constructor(resource: Resource = Resource.Auth) {
    super(resource);
    this.resource = resource;
  }

  async signIn(data: Object, config?: Object): Promise<ClientResponse<{ token: string; auth: IAuth }>> {
    try {
      // Handle the response here
      const response = await this.axiosApi.post(this.url + '/signin', data, config)
      if (response.status === 201) return response as ClientResponse<{ token: string; auth: IAuth }>
      throw new Error(`Unexpected error in response: ${response}`);
    }
    catch (error) {
      // Handle any errors here
      throw new Error(`${error}`);
    }
  }

  async signUp(data: Object, config?: Object): Promise<ClientResponse<IAuth>> {
    try {
      // Handle the response here
      const response = await this.axiosApi.post(this.url + '/signup', data, config)
      if (response.status === 201) return response as ClientResponse<IAuth>
      throw new Error(`Unexpected error in response: ${response}`);
    }
    catch (error) {
      // Handle any errors here
      throw new Error(`${error}`);
    }
  }
}