import axios from "axios"
import { siteConfig } from "@/_config/site-config"
export const addNewImageService = async (data: any) => {
    try {

        const { token } = data
        const saveImage = await axios.post(`${siteConfig.databaseUrl}/images/new`, data,
            {
                headers: {
                    Authorization: token
                }
            }
        )

        return saveImage?.data
    }
    catch {
        console.log("error, failed to add new image")
    }
}

export const getAllImagesOfUserSrrvice = async () => {
    try {
        const token = localStorage.getItem("token");
        const getImagesRecord = await axios.get(`${siteConfig.databaseUrl}/images`,
            {
                headers: {
                    Authorization: token
                }
            }
        )

        return getImagesRecord?.data?.response

    }
    catch {
        console.log("Failed to fetch all images of user")
    }
}

export const deleteImageService = async (imageId: string) => {
    try {
        const token = localStorage.getItem("token");

        const deleteImage = await axios.delete(`${siteConfig.databaseUrl}/images/delete/${imageId}`,
            {
                headers: {
                    Authorization: token
                }
            }
        )

        return deleteImage?.data
    }
    catch {
        console.log("Failed to delete image")

    }
}

