import { Resource, IReviews } from '../../types/resource';
import GenericResource from "./genericResource"

export default class ReviewsResource extends GenericResource<IReviews> {
  constructor(resource: Resource = Resource.Reviews) {
    super(resource);
    this.resource = resource;
  }
}