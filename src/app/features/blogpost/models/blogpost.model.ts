import { Category } from "../../category/models/category.model";

export interface Blogpost{
    id:string;
    title:string;
    urlHandle:string;
    shortDescription:string;
    content:string;
    featuredImageUrl:string;
    author:string;
    publishedDate:Date;
    isVisible : boolean;
    categories:Category[];
}