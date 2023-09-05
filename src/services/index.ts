import AxiosApiAuth from "@/api/axiosApiAuth";
import Auth from "./Auth";

export const AuthService = new Auth(new AxiosApiAuth());

// export const UserService = new User(new AxiosApiUser());
