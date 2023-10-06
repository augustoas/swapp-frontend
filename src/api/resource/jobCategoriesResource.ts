import { Resource, IJobCategories } from '../../types/resource';
import GenericResource from "./genericResource"

export default class JobCategoriesResource extends GenericResource<IJobCategories> {
  constructor(resource: Resource = Resource.JobCategories) {
    super(resource);
    this.resource = resource;
  }
}