import { BannerImage } from "@/@types/banner";
import { useSuspenseQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Banner = () => {
  const { data } = useSuspenseQuery<AxiosResponse, AxiosError, BannerImage[]>({
    queryKey: ["banner-picture"],
    queryFn: () => axios.get("https://picsum.photos/v2/list"),
    select: (data) => data.data,
  });

  return (
    <Carousel>
      <CarouselContent className="h-auto">
        {data.map((value) => {
          return (
            <CarouselItem className="h-[380px]" key={value.id}>
              <img
                className="w-full h-auto"
                key={value.id}
                src={value.download_url}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

export default Banner;
