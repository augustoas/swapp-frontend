import { Resource, IJobs } from '../../types/resource';
import GenericResource from "./genericResource"

export default class JobsResource extends GenericResource<IJobs> {
  constructor(resource: Resource = Resource.Jobs) {
    super(resource);
    this.resource = resource;
  }
}