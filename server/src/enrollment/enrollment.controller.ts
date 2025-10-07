import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollDto } from './dto/enroll.dto';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { Role } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guard/auth.guard';

@Controller('enrollment')
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService){}

    @Role(UserRole.STUDENT)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Post()
    enrollStudent(@Body() enrollDto: EnrollDto,@Request() req : {user: { sub: string }}) {
        return this.enrollmentService.enroll(req.user.sub, enrollDto.courseId);
    }

    @Role(UserRole.STUDENT)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Get()
    getAllEnrolledCourses(@Request() req: {user: {sub: string}}) {
        return this.enrollmentService.findAllEnrolledCourses(req.user.sub);
    }

}