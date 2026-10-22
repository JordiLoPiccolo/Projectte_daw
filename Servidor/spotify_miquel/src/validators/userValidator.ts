
import { User } from "../interfaces/user/user";


export function isValidUser(user: User): boolean {
    
    if (!user) {
        return false;
    }

    if (user.email === null || user.country === null) {
        return false
    } else {

            return true;
        }
    
}
