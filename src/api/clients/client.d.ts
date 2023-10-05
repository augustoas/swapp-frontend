export interface ClientResponse<T> {
  data: {
    message: string;
    payload: T;
    status: string;
    validation_result?;
  };
  status: number;
  statusText: string;
  message?: string;
}

export interface ClientAPI {
  get<T>(url: string, config?): Promise<ClientResponse<T>>;
  post<T>(url: string, data?, config?): Promise<ClientResponse<T>>;
  put<T>(url: string, data?, config?): Promise<ClientResponse<T>>;
  patch<T>(url: string, data?, config?): Promise<ClientResponse<T>>;
  delete<T>(url: string, config?): Promise<ClientResponse<T>>;
}
