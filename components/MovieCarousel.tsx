"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Movie } from "@/types/types";

interface MovieCarouselProps {
  movies: Movie[];
  title: string;
  type: 'movie' | 'tv';
}

export default function MovieCarousel({ movies, title, type }: MovieCarouselProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});
  const router = useRouter(); // Initialize useRouter

  const handleImageError = (id: number) => {
    setImageError((prev) => ({ ...prev, [id]: true }));
  };

  const handleMovieClick = (id: number, type: 'movie' | 'tv') => {
    router.push(`/details/${type}/${id}`); // Navigate to the details page with type
  };

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
          {movies.map((movie) => (
            <CarouselItem
              key={movie.id}
              className="pl-1 sm:pl-2 md:pl-3 lg:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
            >
              <div
                className="relative group cursor-pointer" // Added cursor-pointer for clickable
                onMouseEnter={() => setHoveredIndex(movie.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleMovieClick(movie.id, type)} // Updated click handler
              >
                <Card className="border-0">
                  <CardContent className="p-0 relative">
                    <Image
                      src={imageError[movie.id] ? "/images/movie-poster-placeholder.png" : `https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      width={200}
                      height={300}
                      className="w-full h-auto object-cover rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105"
                      onError={() => handleImageError(movie.id)}
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
