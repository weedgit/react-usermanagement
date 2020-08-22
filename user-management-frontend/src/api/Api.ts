/**
 * Wrapper class for Axios that applies a custom authorization header for all requests.
 * @packageDocumentation
 */
import axios, { AxiosResponse, AxiosRequestConfig, CancelTokenSource } from 'axios';

interface RequestConfigOptions extends AxiosRequestConfig {
  source?: CancelTokenSource;
}

class Api {
  static delete(url: string, options: RequestConfigOptions): Promise<AxiosResponse<any>> {
    return this.request({
      ...options,
      url,
      method: 'DELETE'
    });
  }

  static get(url: string, options: RequestConfigOptions): Promise<AxiosResponse<any>> {
    return this.request({
      ...options,
      url,
      method: 'GET'
    });
  }

  static patch(
    url: string,
    data: Record<string, unknown>,
    options: RequestConfigOptions
  ): Promise<AxiosResponse<any>> {
    const { headers = {} } = options;
    const patchHeaders = {
      ...headers,
      'Content-Type': 'application/json-patch+json'
    };
    return this.request({
      ...options,
      url,
      method: 'PATCH',
      data,
      headers: patchHeaders
    });
  }

  static post(
    url: string,
    data: Record<string, unknown>,
    options: RequestConfigOptions
  ): Promise<AxiosResponse<any>> {
    return this.request({
      ...options,
      url,
      method: 'POST',
      data
    });
  }

  static put(
    url: string,
    data: Record<string, unknown>,
    options: RequestConfigOptions
  ): Promise<AxiosResponse<any>> {
    return this.request({
      ...options,
      url,
      method: 'PUT',
      data
    });
  }

  static request({
    url,
    method,
    data,
    params,
    headers,
    responseType = 'json',
    source
  }: RequestConfigOptions): Promise<AxiosResponse<any>> {
    const options: RequestConfigOptions = {
      url,
      method,
      data,
      params,
      headers,
      responseType
    };

    if (source) {
      options.cancelToken = source.token;
    }

    const authToken = sessionStorage.getItem('authToken');

    if (authToken) {
      options.headers = {
        ...headers,
        Authorization: authToken
      };
    }

    return axios.request(options);
  }

  static source(): CancelTokenSource {
    return axios.CancelToken.source();
  }

  static isCancel(error: Record<string, unknown>): boolean {
    return axios.isCancel(error);
  }
}

export default Api;
