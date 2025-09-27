import { UserRole } from '../enums/user-role.enum';

export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
