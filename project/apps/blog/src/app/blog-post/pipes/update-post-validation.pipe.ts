import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UpdateTypePostDto } from "../dto/update-post.dto";

const TYPE = 'body';

export class UpdatePostValidationPipe implements PipeTransform {
  async transform(dto, { type }: ArgumentMetadata) {

    if (type === TYPE) {
      const post = plainToInstance(UpdateTypePostDto[dto.type], dto);
      const errors = await validate(post, { validationError: { target: false }});

      if (errors.length > 0) {
          throw new BadRequestException(errors)
      }

      return dto;
    }
  }
}
