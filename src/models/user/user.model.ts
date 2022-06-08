export interface UserDTO {
  id: string;
  name: string;
  avatar: string;
  friends: UserDTO[];
}
