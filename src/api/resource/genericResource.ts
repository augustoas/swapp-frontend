import ResourceFactory from "./resource.factory";
import { Resource } from '../../types/resource';
import { ClientResponse } from "@/api/clients/client.d";

export default class GenericResource<T> extends ResourceFactory {
  constructor(resource: Resource) {
    super(resource);
    this.resource = resource;
  }

  async create(data: Object, config?: Object): Promise<ClientResponse<T>> {
    try {
      // Handle the response here
      const response = await this.axiosApi.post(this.url, data, config)
      if (response.status === 201) return response as ClientResponse<T>
      throw new Error(`Unexpected error in response: ${response}`);
    }
    catch (error) {
      // Handle any errors here
      throw new Error(`${error}`);
    }
  }

  async findOne(id: number, config?: Object): Promise<ClientResponse<T>> {
    try {
      // Handle the response here
      const response = await this.axiosApi.get(this.url + `/${id}`, config)
      if (response.status === 200) return response as ClientResponse<T>
      throw new Error(`Unexpected error in response: ${response}`);
    }
    catch (error) {
      // Handle any errors here
      throw new Error(`${error}`);
    }
  }

  async findAll(config?: Object): Promise<ClientResponse<T[]>> {
    try {
      // Handle the response here
      const response = await this.axiosApi.get(this.url, config)
      if (response.status === 200) return response as ClientResponse<T[]>
      throw new Error(`Unexpected error in response: ${response}`);
    }
    catch (error) {
      // Handle any errors here
      throw new Error(`${error}`);
    }
  }

  async update(id: number, data: Object, config?: Object): Promise<ClientResponse<T>> {
    try {
      // Handle the response here
      const response = await this.axiosApi.patch(this.url + `/${id}`, data, config)
      if (response.status === 200) return response as ClientResponse<T>
      throw new Error(`Unexpected error in response: ${response}`);
    }
    catch (error) {
      // Handle any errors here
      throw new Error(`${error}`);
    }
  }

  async delete(id: number, config?: Object): Promise<ClientResponse<T>> {
    try {
      // Handle the response here
      const response = await this.axiosApi.delete(this.url + `/${id}`, config)
      if (response.status === 200) return response as ClientResponse<T>
      throw new Error(`Unexpected error in response: ${response}`);
    }
    catch (error) {
      // Handle any errors here
      throw new Error(`${error}`);
    }
  }
}