'use client'
import React from 'react'
import Image from 'next/image'
import { macBookImg, sampleUserImg } from '@/utils/constanst'

const PopularCoursesCard = ({ image, title, type, authorName, authorImg, price, students, classes, rating }) => {
    // console.log(authorImg)
    // console.log(image)
    return (
        <div className='h-[65dvh] w-[25dvw] flex flex-col items-start justify-center gap-2 bg-zinc-100 rounded-[10px] p-2 overflow-hidden'>
            <div className="h-[50%] w-full flex flex-col items-center justify-center rounded overflow-hidden">
                <Image src={macBookImg} style={{ height: '100%', width: '100%', objectFit: 'cover' }} priority={true} alt='CardImg' />
            </div>
            <div className="h-[max-content] w-full flex items-center justify-between">
                <div className="h-[max-content] w-[max-content] flex items-center justify-center gap-2 py-1 px-2 bg-purple-300 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="purple" className="bi bi-circle-fill" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="8" />
                    </svg>
                    <h3 className='h-[max-content] font-[500] text-[.8rem]'>{type}</h3>
                </div>
                <div className="h-[max-content] w-[max-content] flex items-center justify-center rounded gap-2 px-2 py-1 bg-purple-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gold" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <h3 className='text-white text-center'>{rating}</h3>
                </div>
            </div>
            <div className="h-[max-content] w-full flex items-start justify-start">
                <h2 className='h-[max-content] w-[90%] font-[700] text-[1.5rem]'>{title}</h2>
            </div>
            <div className="h-[max-content] w-full flex items-center justify-start gap-4 py-2" style={{ borderBottom: '.2px solid gray' }}>
                <div className="h-[max-content] w-[max-content] flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="purple" className="bi bi-book" viewBox="0 0 16 16">
                        <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                    </svg>
                    <h3 className='font-[500] text-[1rem]'>{classes} Classes</h3>
                </div>
                <div className="h-[max-content] w-[max-content] flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="purple" className="bi bi-person" viewBox="0 0 16 16">
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                    <h3 className='font-[500] text-[1rem]'>{students} Students</h3>
                </div>
            </div>
            <div className="h-[max-content] w-full flex items-center justify-between px-1">
                <div className="h-[max-content] w-[max-content] flex items-center justify-center">
                    <h3 className='font-[600] text-[1.3rem]'>{price}</h3>
                </div>
                <div className="h-[max-content] w-[max-content] flex items-center justify-center gap-2">
                    <div className="h-[max-content] w-[max-content] rounded-[50%] overflow-hidden">
                        <Image src={sampleUserImg} priority={true} style={{ height: '30px', width: '30px', objectFit: 'cover' }} alt='authorImg' />
                    </div>
                    <h3 className='font-[500]'>{authorName}</h3>
                </div>
            </div>
        </div>
    )
}

export default PopularCoursesCard