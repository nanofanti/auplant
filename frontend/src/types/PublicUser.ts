export interface PublicUser {
  _id: string;
  name: string;
  roles: ("owner" | "sitter")[];
  profileImage?: string;
  bio?: string;
}

export interface PublicUserResponse {
  message: string;
  data: PublicUser;
}
