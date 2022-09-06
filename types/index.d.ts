import { UserType } from "../interfaces/types";

declare global {
    namespace Express {
        interface Request {
            user: UserType
        }
    }
}