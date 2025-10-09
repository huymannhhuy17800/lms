import { Inject, Injectable } from '@nestjs/common';
import { CoursesRepository } from './repository/course.repository';
import {  CreateCourseDto } from './dto/create-course.dto';
import { CourseData } from './entities/course-data.entity';
import { UpdateCourseDto } from './dto/update-course.dto';
import { UserRepository } from 'src/users/repository/users.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { Types } from 'mongoose';
import { type Cache } from 'cache-manager';

@Injectable()
export class CoursesService {
    constructor(private courseRepo : CoursesRepository, private userRepo : UserRepository,
        @Inject('CACHE_MANAGER') private cacheManager : Cache
    ){}
    
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
        console.log("This will be printed 1 time if there is nothing on cache")
        const course = await this.courseRepo.getSingleCourse(id);
        return course;
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

    async addReview(userId : string, createReviewDto : CreateReviewDto) {
        // Check if user enrolled to this course
        const reviewEntity = new Review();
        reviewEntity.user = new Types.ObjectId(userId);
        reviewEntity.rating = createReviewDto.rating;
        reviewEntity.comment = createReviewDto.comment;
        return await this.courseRepo.save({
            reviews : [ reviewEntity ],
        })
    }
}
