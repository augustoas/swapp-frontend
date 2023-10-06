import { Resource, IReplies } from '../../types/resource';
import GenericResource from "./genericResource"

export default class RepliesResource extends GenericResource<IReplies> {
  constructor(resource: Resource = Resource.Replies) {
    super(resource);
    this.resource = resource;
  }
}