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
        console.log('Validating user:', username);
        console.log('With password:', password); 

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
        console.log('User found:', !!user);
        console.log('Password validation:', user ? await this.userService.validatePassword(password, user.password) : 'No user');
        

        if (user && await this.userService.validatePassword(password, user.password)) {
            const { password, ...result } = user.toObject();
            console.log('Validation successful, returning user:', result.username);
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
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        };
    }
}
