export type PaginarDTO = {
    page: number;
    size: number;
    orderBy?: string;
    direction?: 'asc' | 'desc';
    search?: string;
}