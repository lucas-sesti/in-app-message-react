import axios, { Axios, AxiosStatic } from "axios";

export abstract class BaseService<T> {
  public endpoint: string;
  static axios: AxiosStatic;

  constructor(endpoint: string) {
    this.endpoint = endpoint;

    BaseService.createAxios("http://localhost:3030");
  }

  static async createAxios(baseUrl: string): Promise<Axios> {
    this.axios = axios;
    this.axios.defaults.baseURL = baseUrl;

    return this.axios;
  }

  async get(path: string): Promise<T> {
    try {
      const response = await axios.get(`/${this.endpoint}/${path}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getOne(id: string) {
    try {
      const response = await this.get(id);

      return response;
    } catch (error) {
      throw error;
    }
  }
}
