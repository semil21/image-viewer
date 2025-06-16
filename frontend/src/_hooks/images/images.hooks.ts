import { getAllImagesOfUserSrrvice } from "@/_service/image/image.servie";
import { useQuery } from "@tanstack/react-query";

export const useAllImagesOfUserHook = () => {
    return useQuery({
        queryFn: getAllImagesOfUserSrrvice,
        queryKey: ['all-images-of-user']
    })
}