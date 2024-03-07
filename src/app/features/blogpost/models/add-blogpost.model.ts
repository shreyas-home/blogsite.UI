export interface AddBlogpost{
    title:string;
    urlHandle:string;
    shortDescription:string;
    content:string;
    featuredImageUrl:string;
    author:string;
    publishedDate:Date;
    isVisible : boolean;
    categories  : string[];
}