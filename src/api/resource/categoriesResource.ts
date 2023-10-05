import { Resource } from '../../types/resource';
import GenericResource from "./genericResource"

export default class CategoriesResource extends GenericResource {
  constructor(resource: Resource = Resource.Categories) {
    super(resource);
    this.resource = resource;
  }
}