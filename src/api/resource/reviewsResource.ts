import { Resource } from '../../types/resource';
import GenericResource from "./genericResource"

export default class ReviewsResource extends GenericResource {
  constructor(resource: Resource = Resource.Reviews) {
    super(resource);
    this.resource = resource;
  }
}