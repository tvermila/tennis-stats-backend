export default class UpdatePasswordDto {
  id: number;
  readonly username: string;
  readonly oldPass: string;
  readonly newPass: string;
}