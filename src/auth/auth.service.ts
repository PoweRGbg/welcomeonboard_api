import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from '../common/dto/login.dto';
import { UserRole } from 'src/common/enums/user-role.enum';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const allUsers = await this.userService.findAll();
        if (!allUsers.length) {
            await this.userService.create({
                username: 'test',
                password: 'password',
                firstName: 'Test',
                lastName: 'User',
                email: 'test@all.us',
                role: UserRole.ADMIN,
            });
        }
        
        const user = await this.userService.findByUsername(username);
        console.log('Password validation:', user ?
            await this.userService.validatePassword(password, user.password) :
            'No user'
        );
        

        if (user && await this.userService.validatePassword(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.username, loginDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { username: user.username, sub: user._id, role: user.role };
        return {
            token: this.jwtService.sign(payload),
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                expires: Date.now() + 1000 * 60 * 5,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }

    async extendSession(token: string, userId: string) {
        const tokenIsValid = await this.jwtService.verify(token);
        const user = await this.userService.findOne(userId);
        if (!tokenIsValid || !user) {
            throw new UnauthorizedException('ExtendSession: Invalid token or user', userId);
        }
        
        console.log('Extending session for', user.username);
        const payload = { username: user.username, sub: user['_id'], role: user.role };
        return {
            token: this.jwtService.sign(payload),
            user: {
                id: user['_id'],
                username: user.username,
                email: user.email,
                role: user.role,
                expires: Date.now() + 1000 * 60 * 5,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }
}
