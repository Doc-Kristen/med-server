import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(message: string[] | string) {
    super(
      { statusCode: HttpStatus.BAD_REQUEST, message },
      HttpStatus.BAD_REQUEST,
    );
  }
}
