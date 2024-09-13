'use client'
import React from 'react'
import PopularCoursesCard from './PopularCoursesCard'
import { PopularCoursesCardData } from '@/utils/constanst'

const PopularCourses = () => {
    return (
        <div className='w-full h-[100dvh] flex flex-col items-center justify-around bg-purple-500'>
            <h1 className='w-[max-content] h-[max-content] text-white font-[500] text-[2.5rem]'>Our Popular Courses</h1>
            <p className='w-[50dvw] h-[max-content] text-white font-[400] text-[1.1rem] text-center'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio, temporibus nobis.
                Eligendi similique natus voluptatem fugiat dolorem neque ad beatae.
                Facere totam expedita vitae nobis.</p>
            <div className="w-full h-[max-content] grid grid-cols-3 items-center justify-evenly px-20">
                {PopularCoursesCardData.map((data, i) => {
                    return (
                        <PopularCoursesCard
                            key={i}
                            title={data.title}
                            price={data.price}
                            type={data.type}
                            students={data.students}
                            classes={data.classes}
                            rating={data.rating}
                            authorName={data.authorName}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default PopularCourses