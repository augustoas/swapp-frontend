import AxiosApi from '../axiosApiAuth';
import { Resource } from '../../types/resource';

export default abstract class ResourceFactory {
  protected axiosApi = new AxiosApi();
  protected resource: Resource;
  protected url: string;

  constructor(resource: Resource) {
    this.resource = resource;
    this.url = `/backend/${this.resource}`;
  }
}