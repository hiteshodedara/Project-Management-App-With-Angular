export interface Board {
    id?:number,
    title:string,
    description:string,
    isFavorite:boolean,
    isArchive:boolean,
    workspaceId?:number
}
