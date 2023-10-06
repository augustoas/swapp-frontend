export enum Resource {
  Reviews = 'reviews',
  Replies = 'replies',
  Categories = 'categories',
  JobCategories = 'job-categories',
  Jobs = 'jobs',
  Users = 'users',
  Auth = 'auth',
}

interface IDefaultAttributes {
  id: number, 
  createdDate: Date,
  updatedDate: Date,
}

export interface IReviews extends IDefaultAttributes {

}
export interface IReplies extends IDefaultAttributes {
  
}
export interface ICategories extends IDefaultAttributes {
  
}
export interface IJobCategories extends IDefaultAttributes {
  
}
export interface IJobs extends IDefaultAttributes {
  
}
export interface IUsers extends IDefaultAttributes {
  
}
export interface IAuth extends IDefaultAttributes {
  
}