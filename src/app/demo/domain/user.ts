import { Role } from "./Role";

export class User {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    appRoles?: Array<Role>;
      
}
