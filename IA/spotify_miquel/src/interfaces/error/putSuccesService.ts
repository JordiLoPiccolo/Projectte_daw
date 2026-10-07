export interface PutSuccessService<T> {
    success: boolean;
    data: T;
    code: number;
    index: number;

}
