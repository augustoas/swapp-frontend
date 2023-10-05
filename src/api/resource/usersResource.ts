import { Resource } from '../../types/resource';
import GenericResource from "./genericResource"

export default class UsersResource extends GenericResource {
  constructor(resource: Resource = Resource.Users) {
    super(resource);
    this.resource = resource;
  }
}