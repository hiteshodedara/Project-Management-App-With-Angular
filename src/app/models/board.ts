export interface Board {
    id?:number,
    title:string,
    description:string,
    isFavorite:boolean,
    isArchive:boolean,
    todolists:any[],
    todos:any[],
    workspaceId:number
}
