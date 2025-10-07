import { Injectable } from '@nestjs/common';
import { CoursesRepository } from './repository/course.repository';
import {  CreateCourseDto } from './dto/create-course.dto';
import { CourseData } from './entities/course-data.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UserRepository } from 'src/users/repository/users.repository';

@Injectable()
export class CoursesService {
    constructor(private courseRepo : CoursesRepository, private userRepo : UserRepository){}
    
    async findAll() {
        return await this.courseRepo.findAll();
    }

    async createCourse(createCourseDto : CreateCourseDto) {
    // Convert Dto to Entity
    const instructor = await this.userRepo.findById(createCourseDto.instructor)
    const courseDataEntities: CourseData[] = (createCourseDto.courseData || []).map(dto => {
    const entity = new CourseData();
    entity.title = dto.title;
    entity.desc = dto.desc;
    entity.videoUrl = dto.videoUrl;
    entity.videoThumbnail = dto.videoThumbnail;
    entity.videoSection = dto.videoSection;
    entity.videoLength = dto.videoLength;
    entity.videoPlayer = ''; 
    entity.suggestion = '';
    entity.question = [];

    return entity;
  });
        await this.courseRepo.save({
            name : createCourseDto.name,
            desc: createCourseDto.desc,
            price: createCourseDto.price,
            demoUrl: createCourseDto.demoUrl,
            prerequisities: createCourseDto.prerequisities,
            courseData: courseDataEntities,
            instructor : instructor?._id
        })
    }

    async updateCourse(id: string, updateCourseDto : UpdateCourseDto) {
        const courseDataEntities: CourseData[] = (updateCourseDto.courseData || []).map(dto => {
        const entity = new CourseData();
        entity.title = dto.title;
        entity.desc = dto.desc;
        entity.videoUrl = dto.videoUrl;
        entity.videoThumbnail = dto.videoThumbnail;
        entity.videoSection = dto.videoSection;
        entity.videoLength = dto.videoLength;
        entity.videoPlayer = ''; 
        entity.suggestion = '';
        entity.question = [];

        return entity;
        });
        const updatedCourse = {
            name : updateCourseDto.name,
            desc: updateCourseDto.desc,
            price: updateCourseDto.price,
            demoUrl: updateCourseDto.demoUrl,
            prerequisities: updateCourseDto.prerequisities,
            courseData: courseDataEntities,
        }
        return this.courseRepo.findByIdAndUpdate(id,updatedCourse);
    }

    async getSingleCourse(id : string) {
        // const cacheKey = `course:${id}`;
        return await this.courseRepo.getSingleCourse(id);
    }

    async getAllCourse() {
        return await this.courseRepo.getAllCourse();
    }

    async getAllCoursesByInstructor(id: string) {
        return await this.courseRepo.getAllCoursesByInstructor(id);
    }

    async deleteCourse(id: string) {
        return await this.courseRepo.delete(id);
    }

    async addQuestionToCourse() {
        
    }
}
