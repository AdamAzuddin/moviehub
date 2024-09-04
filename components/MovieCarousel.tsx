"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

interface MovieCarouselProps {
  movies: Movie[];
  title: string;
}

export default function MovieCarousel({ movies, title }: MovieCarouselProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {movies.map((movie, index) => (
            <CarouselItem
              key={movie.id}
              className="pl-1 sm:pl-2 md:pl-3 lg:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
            >
              <div
                className="relative group"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card className="border-0">
                  <CardContent className="p-0 relative">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-end justify-center">
                      <p className="text-white text-center p-1 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs sm:text-sm md:text-base">
                        {movie.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12 bg-transparent border-none hover:bg-transparent">
          <ChevronLeft className="w-8 h-8 text-white" />
        </CarouselPrevious>
        <CarouselNext className="hidden md:flex -right-12 bg-transparent border-none hover:bg-transparent">
          <ChevronRight className="w-8 h-8 text-white" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
