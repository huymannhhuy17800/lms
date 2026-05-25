import React, { useState } from 'react'
import CourseTag from './CourseTag'

const dummy = {
    title: "ReactJS Full Course 2025 BootCamp With ABC and XYZ",
    mentor: "Nguyen Manh Huy"
}

const dummy2 = {
    tag: "best_seller",
    label: "Best seller",
    rating: 5,
    ratingCount: 12345
}


const CourseItem = () => {
    const [isHover, setIsHover] = useState(false);
    return (
        <div className='w-[300px] h-[360px] border-1 border-gray-200 rounded-xl cursor-pointer relative hover:bg-gray-50'
            onMouseEnter={() => setIsHover(!isHover)}
            onMouseLeave={() => setIsHover(false)}>
            <div className="h-[200px] w-[300px] m-auto p-4">
                <img src="/test.jpg" alt="Course" className='h-full w-full object-cover rounded-xl' />
            </div>
            <Title {...dummy} />
            <CourseProps {...dummy2} />
            {/* <PriceTag {...dummyPrice} /> */}
            {/* {isHover && <HoverCoursePopup />} */}
        </div >
    )
}

const Title = ({ title, mentor }: { title: string, mentor: string }) => {
    return <div className="px-4">
        <h2 className='font-semibold text-[18px] leading-5.5'>{title}</h2>
        <p className='text-[13px] text-gray-500 pt-1.5'>{mentor}</p>
    </div>
}

const CourseProps = ({ tag, label, rating, ratingCount }: {
    tag?: string,
    label?: string,
    rating?: number,
    ratingCount?: number
}) => {
    return <div className="px-4 mt-6 flex items-center gap-2">
        <div className="w-8 rounded-[5px] border-1 border-gray-200 px-2 text-[12px]">
            <div className="flex items-center gap-1">
                <div className="text-[12px] text-gray-500">{rating}</div>
                <img src="/star.svg" alt="" className='w-2 h-2' />
            </div>
        </div>
        <div className="rounded-[5px] border-1 border-gray-200 px-2 text-[12px] text-gray-500">{ratingCount} ratings</div>
        <CourseTag tag={tag} label={label} />
    </div >
}

const PriceTag = ({ ogPrice, afterSalesPrice }: { ogPrice?: number, afterSalesPrice?: number }) => {
    return <div className="mt-2 px-4 flex gap-3">
        {/* {isDiscount && ()} */}
        <div className="font-semibold">{String(ogPrice).split(".").join(",")} Đ</div>
        <div className="stroke-1">{afterSalesPrice}</div>
    </div>
}


export default CourseItem