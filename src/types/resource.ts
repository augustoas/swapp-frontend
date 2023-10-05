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

interface IReviews extends IDefaultAttributes {

}
interface IReplies extends IDefaultAttributes {
  
}
interface ICategories extends IDefaultAttributes {
  
}
interface IJobCategories extends IDefaultAttributes {
  
}
interface IJobs extends IDefaultAttributes {
  
}
interface IUsers extends IDefaultAttributes {
  
}
interface IAuth extends IDefaultAttributes {
  
}