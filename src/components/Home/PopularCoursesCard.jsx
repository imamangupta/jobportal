"use client";

import React from "react";
import Image from "next/image";
import { Star, Book, Users } from "lucide-react";

const PopularCoursesCard = ({
  image,
  title,
  type,
  authorName,
  authorImg,
  price,
  students,
  classes,
  rating,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col">
      <div className="relative h-48 w-full">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {type}
          </span>
          <div className="flex items-center bg-purple-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
            <Star className="w-3 h-3 mr-1" />
            {rating}
          </div>
        </div>
        <h3 className="text-lg font-bold mb-2 line-clamp-2 flex-grow">
          {title}
        </h3>
        <div className="flex items-center justify-between mb-2 text-sm text-gray-600">
          <div className="flex items-center">
            <Book className="w-4 h-4 mr-1 text-purple-500" />
            <span className="whitespace-nowrap">{classes} Classes</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-purple-500" />
            <span className="whitespace-nowrap">{students} Students</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t mt-auto">
          <span className="text-lg font-bold text-purple-600">{price}</span>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
              <Image
                src={authorImg || "/placeholder.svg"}
                alt={authorName}
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="text-sm font-medium truncate">{authorName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularCoursesCard;
