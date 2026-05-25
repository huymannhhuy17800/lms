import React from 'react'
import { courseLabel } from '../../constants/utils';

const CourseTag = ({ tag, label }: { tag?: string, label?: string }) => {
    return (
        <div className={tag ? courseLabel[tag as keyof typeof courseLabel] : ""}>{label}</div >
    )
}

export default CourseTag