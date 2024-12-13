import { GENDER } from "src/common/enums/gender.enum";
import { ROLES } from "src/common/enums/role.enum";

export class UserEntity {
    id: number;
    name: string;
    age: number;
    password:string;
    photo?: string;
    email: string;
    roles: ROLES;
    gender: GENDER;
    isActive: boolean;
}