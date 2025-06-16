import { loginType } from "@/_types/login.types"
import axios from "axios"
import { siteConfig } from "@/_config/site-config"
export const LoginService = async (data: loginType) => {
    try {

        const verifyLogin = await axios.post(`${siteConfig.databaseUrl}/user/login`, data)

        console.log("verifyLogin123", verifyLogin?.data)

        return verifyLogin?.data
    }
    catch (error) {
        console.log("error, failed to log in")
    }
}