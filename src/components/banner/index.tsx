import { BannerImage } from "@/@types/banner"
import { useSuspenseQuery } from "@tanstack/react-query"
import axios, { AxiosError, AxiosResponse } from "axios"

const Banner = () => {

    const { data } = useSuspenseQuery<AxiosResponse, AxiosError, BannerImage[]>({
        queryKey: ["banner-picture"],
        queryFn: () => axios.get("https://picsum.photos/v2/list"),
        select: (data) => data.data,
    })

    return (
        <div>
            배너이미지
        </div>
    ) 

}

export default Banner