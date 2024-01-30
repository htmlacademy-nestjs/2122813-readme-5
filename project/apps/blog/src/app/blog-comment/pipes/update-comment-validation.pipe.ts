import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UpdateCommentDto } from "../dto/update-comment.dto";

const TYPE = 'body';

export class UpdateCommentValidationPipe implements PipeTransform {
  async transform(dto: UpdateCommentDto, { type }: ArgumentMetadata) {

    if (type === TYPE) {
      const comment = plainToInstance(UpdateCommentDto, dto);
      const errors = await validate(comment, { validationError: { target: false }});

      if (errors.length > 0) {
          throw new BadRequestException(errors)
      }

      return dto;
    }
  }
}
