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

        console.log('saveImage123', saveImage)
    }
    catch (error) {
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
    catch (error) {
        console.log("Failed to fetch all images of user")
    }
}
