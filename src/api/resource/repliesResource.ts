import { Resource } from '../../types/resource';
import GenericResource from "./genericResource"

export default class RepliesResource extends GenericResource {
  constructor(resource: Resource = Resource.Replies) {
    super(resource);
    this.resource = resource;
  }
}