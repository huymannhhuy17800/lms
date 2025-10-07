import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AccessTokenGuard } from 'src/auth/guard/access-token.guard';
import { RoleGuard } from 'src/auth/guard/auth.guard';
import { UserRole } from 'src/users/entities/user.entity';
import { Role } from 'src/decorators/role.decorator';

@Controller('courses')
export class CoursesController {
    constructor(private courseService : CoursesService){}

    @Get()
    getAllCourses() {
        return this.courseService.getAllCourse();
    }

    @Get()
    getAllCoursesByInstructor(@Request() req: {user : {sub : string}}) {
        return this.courseService.getAllCoursesByInstructor(req.user.sub);
    }

    @Get(':id')
    getSingleCourse(@Param('id') id : string){
        return this.courseService.getSingleCourse(id);
    }

    @Role(UserRole.INSTRUCTOR)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Post()
    createCourse(@Body() createCourseDto : CreateCourseDto){
        return this.courseService.createCourse(createCourseDto)
    }

    @Patch(':id')
    updateCourse(@Param() id: string, @Body() updateCourseDto : UpdateCourseDto){
        return this.courseService.updateCourse(id,updateCourseDto);
    }

    @Role(UserRole.INSTRUCTOR)
    @UseGuards(AccessTokenGuard, RoleGuard)
    @Delete(':id')
    deleteCourse(@Param('id') id : string) {
        return this.courseService.deleteCourse(id);
    }

}
