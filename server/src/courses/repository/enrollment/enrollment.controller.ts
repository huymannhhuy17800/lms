import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { EnrollDto } from './dto/enroll.dto';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { Role } from 'src/decorators/role.decorator';
import { RoleGuard } from 'src/auth/guard/auth.guard';

@Controller('enrollment')
@Role(UserRole.STUDENT)
@UseGuards(AccessTokenGuard, RoleGuard)
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService){}

    @Post()
    enrollStudent(@Body() enrollDto: EnrollDto,@Request() req : {user: { sub: string }}) {
        return this.enrollmentService.enroll(req.user.sub, enrollDto.courseId);
    }

    @Get()
    getAllEnrolledCourses(@Request() req: {user: {sub: string}}) {
        return this.enrollmentService.findAllEnrolledCourses(req.user.sub);
    }

}