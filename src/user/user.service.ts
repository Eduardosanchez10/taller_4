import { Injectable } from "@nestjs/common";
import { PaginationDto } from "../common/dtos/pagination/pagination.dto";
import { ManagerError } from "../common/errors/manager.error";
import { ResponseAllSuppliers } from "../suppliers/interfaces/response-suppliers.interface";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import { ROLES } from "../common/enums/role.enum";
import { GENDER } from "../common/enums/gender.enum";

@Injectable()
export class UserService {

    private users: UserEntity[] = [
        { id: 1, name: 'maur', password:"1",email: '1111@google.com', age: 1, photo: 'no-se1.jpg', isActive: true,roles:ROLES.USER,gender:GENDER.FEMALE},
        { id: 2, name: 'x', password:"2",email: '22222@google.com', age: 2, photo: 'no-se2.jpg', isActive: true ,roles:ROLES.USER,gender:GENDER.FEMALE},
        { id: 3, name: 'sds', password:"3",email: '333@google.com', age: 3, photo: 'no-se3.jpg', isActive: true ,roles:ROLES.USER,gender:GENDER.FEMALE },
        { id: 4, name: 'da', password:"4",email: '4444@google.com', age: 4, photo: 'no-se4.jpg', isActive: true,roles:ROLES.USER,gender:GENDER.FEMALE },
    ];

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        
        try {
            const user: UserEntity = {
                ...createUserDto,
                isActive: true,
                roles: ROLES.USER,
                id: this.users.length + 1,
            }

            this.users.push();


            const {password} = user
            return   user;
        } catch (error) {
            ManagerError
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<ResponseAllSuppliers> {
        const { limit, page } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            if (this.users.length === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Suppliers not found!',
                })
            }
            
            const total = this.users.filter((user) => user.isActive === true).length;
            const lastPage = Math.ceil(total / limit);
            const data = this.users.filter((users) => users.isActive === true).slice(skip, limit);

            return {
                page,
                limit,
                lastPage,
                total,
                data: [],
            };
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findOne(id: number): Promise<UserEntity> {
        try {
            const user = this.users.find((user) => user.id === id && user.isActive === true);
            if (!user) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Supplier not found',
                });
            }
            return user;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        try {
            const indexUser = this.users.findIndex((user) => user.id === id && user.isActive === true);
            if (indexUser === -1) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Supplier not found',
                });
            }

            this.users[indexUser] = {
                ...this.users[indexUser],
                ...updateUserDto,
            }
            return this.users[indexUser]
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async remove(id: number): Promise<UserEntity> {
        try {
            const indexSupplier = this.users.findIndex((user) => user.id === id && user.isActive === true);
            if (indexSupplier === -1) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Supplier not found',
                });
            }

            this.users[indexSupplier] = {
                ...this.users[indexSupplier],
                isActive: false,
            }

            return this.users[indexSupplier]

        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }
}