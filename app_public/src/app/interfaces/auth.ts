import { User } from "../classes/user";

export interface Auth {
    auth: boolean,
    user: User[],
}