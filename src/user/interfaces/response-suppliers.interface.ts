import { UserEntity } from "../entities/user.entity";

export interface ResponseAllSuppliers{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: UserEntity[];
}