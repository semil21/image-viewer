import axios from "axios";
import { siteConfig } from "@/_config/site-config";
import { signupType } from "@/_types/signup.type";

export const newUserService = async (data: signupType) => {
  try {
    const saveNewUser = await axios.post(
      `${siteConfig.databaseUrl}/user/create-new`,
      data
    );

    return saveNewUser?.data;
  } catch {
    console.log("Failed to create new user");
  }
};
