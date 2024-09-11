import React from 'react'
import Image from 'next/image'

const SearchCourses = () => {
    return (
        <div className='w-full h-[100dvh] flex flex-col items-center justify-center gap-4'>
            <h1 className='font-[700] text-zinc-800 text-[2rem]'>Search Courses</h1>
            <div className="w-[max-content] h-[max-content] flex items-center justify-center gap-4">
                <div className="w-[max-content] h-[max-content] flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    <input type="text" name="searchCourse" id="searchCourse" placeholder='Search for over 50+ courses' className='h-[7dvh] w-[30dvw] rounded text-[1rem] text-zinc-500 px-2 font-[500]' />
                </div>
                <button className='h-[7dvh] w-[7dvw] rounded text-[1rem] text-white p-2 font-[500] bg-purple-600'>Search</button>
            </div>
            <div className="">
                <div className="">
                    <Image src={''} alt='sideImg' priority={true} height={200} width={300} />
                </div>
                <div className="">
                    <h1><diff>Benefits</diff> From Our Online Learning</h1>
                    <ul>
                        <li>
                            <div className=""></div>
                            <div className=""></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SearchCourses