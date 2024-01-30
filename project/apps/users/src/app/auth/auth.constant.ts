export enum AuthUserMessage {
  Exists = 'User with this email exists',
  NotFound = 'User not found',
  WrongPassword = 'User password is wrong',
  NotValidEmail = 'The email is not valid'
}

export enum PasswordLength {
  Min = 6,
  Max = 12
}
