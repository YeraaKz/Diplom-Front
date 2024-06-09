import {Role} from "./role";

export interface UserDTO {
  id: number;
  username: String;
  email: string;
  password: String;
  roles: Role[];

}
