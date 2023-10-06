import { Resource, IUsers } from '../../types/resource';
import GenericResource from "./genericResource"

export default class UsersResource extends GenericResource<IUsers> {
  constructor(resource: Resource = Resource.Users) {
    super(resource);
    this.resource = resource;
  }
}