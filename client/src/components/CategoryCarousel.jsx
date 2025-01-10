import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { setSearchQuery } from "@/redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
  "frontend developer",
  "backend engineer",
  "data analyst",
  "data science",
  "frontend developer",
  "backend engineer",
  "data analyst",
  "data science",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickHandler = (item) => {
    // console.log(item);
    dispatch(setSearchQuery(item));
    navigate(`/browse?search=${item}`);
  };

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-3/4 mx-auto"
      >
        <CarouselContent className="flex">
          {category.map((item, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="p-2">
                <Button
                  className="flex aspect-square items-center justify-center p-4 bg-white hover:bg-gray-50"
                  onClick={() => clickHandler(item)}
                >
                  <span className="text-xl font-semibold text-green-400">
                    {item}
                  </span>
                </Button>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
