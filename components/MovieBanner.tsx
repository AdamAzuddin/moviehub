import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Ensure you're using the correct import
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Movie } from "@/types/types";
import ChevronLeftIcon from '@/components/icons/ChevronLeft';
import ChevronRightIcon from '@/components/icons/ChevronRight';
import { placeholderImage } from '@/constants/constants';
import useMovieNavigation from '@/hooks/useMovieNavigation';


interface MovieBannerProps {
  movies: Movie[];
  type: 'movie' | 'tv';
}

export default function MovieBanner({ movies, type }: MovieBannerProps) {
  const {handleMovieClick} = useMovieNavigation();
  return (
    <div className="w-full max-w-6xl mx-auto py-12 md:py-16 lg:py-20">
      <Carousel className="w-full">
        <CarouselContent>
          {movies.map((movie: Movie) => (
            <CarouselItem key={movie.id} onClick={() => handleMovieClick(movie.id,type)} className="cursor-pointer">
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  layout="responsive"
                  width={1920} // Provide a reasonable default width
                  height={1080} // Provide a reasonable default height
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={placeholderImage} // Use the placeholder image
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">{movie.title}</h3>
                  <p className="text-gray-300 line-clamp-2">{movie.overview}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors">
          <ChevronLeftIcon className="h-8 w-8" />
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors">
          <ChevronRightIcon className="h-8 w-8" />
        </CarouselNext>
      </Carousel>
    </div>
  );
}
