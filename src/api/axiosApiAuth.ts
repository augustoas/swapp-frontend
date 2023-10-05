import BaseApi from "@/api/baseApi";
import { ClientAPI } from "@/api/clients/client.d";
import axiosClientAuth from "@/api/clients/axiosClientAuth";

export default class AxiosApiAuth extends BaseApi implements ClientAPI {
  constructor(provider: ClientAPI = axiosClientAuth) {
    super(provider);
    this.provider = provider;
  }

  get<T>(url: string, config = {}) {
    return this.provider.get<T>(url, config);
  }

  post<T>(url: string, data = {}, config = {}) {
    return this.provider.post<T>(url, data, config);
  }

  put<T>(url: string, data = {}, config = {}) {
    return this.provider.put<T>(url, data, config);
  }

  patch<T>(url: string, data = {}, config = {}) {
    return this.provider.patch<T>(url, data, config);
  }

  delete<T>(url: string, config = {}) {
    return this.provider.delete<T>(url, config);
  }
}
