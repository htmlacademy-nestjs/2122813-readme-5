import { Types } from 'mongoose';
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

const PIPE_ERROR = 'This pipe must used only with params!';
const BAD_MONGOID_ERROR = 'Bad entity ID';
const TYPE = 'param';

@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {

    if (type !== TYPE) {
      throw new Error(PIPE_ERROR);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return value;
  }
}
