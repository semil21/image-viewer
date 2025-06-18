import { loginType } from "@/_types/login.types"
import axios from "axios"
import { siteConfig } from "@/_config/site-config"
export const LoginService = async (data: loginType) => {
    try {

        const verifyLogin = await axios.post(`${siteConfig.databaseUrl}/user/login`, data)


        return verifyLogin?.data
    }
    catch {
        console.log("error, failed to log in")
    }
}