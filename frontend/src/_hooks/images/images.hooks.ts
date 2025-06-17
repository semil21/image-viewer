import { deleteImageService, getAllImagesOfUserSrrvice } from "@/_service/image/image.servie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAllImagesOfUserHook = () => {
    return useQuery({
        queryFn: getAllImagesOfUserSrrvice,
        queryKey: ['all-images-of-user']
    })
}

export const useDeleteImageHook = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteImageService,
        onSuccess: (_data, id) => {
            queryClient.setQueryData(['all-images-of-user'], (oldData: any) =>
                oldData?.filter((img: any) => img._id !== id)
            );
        },

    });
};