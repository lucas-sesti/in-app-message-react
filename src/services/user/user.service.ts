import { UserDTO } from "models";
import { BaseService } from "services/base.service";

class UserService extends BaseService<UserDTO> {
  constructor() {
    super("users");
  }
}

export const userService = new UserService();
