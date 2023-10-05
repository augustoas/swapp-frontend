import { Resource } from '../../types/resource';
import GenericResource from "./genericResource"

export default class JobsResource extends GenericResource {
  constructor(resource: Resource = Resource.Jobs) {
    super(resource);
    this.resource = resource;
  }
}