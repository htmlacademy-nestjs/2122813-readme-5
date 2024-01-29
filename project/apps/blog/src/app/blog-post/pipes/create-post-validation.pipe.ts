import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { CreateTypePostDto } from "../dto/create-post.dto";

export class CreatePostValidationPipe implements PipeTransform {
  async transform(dto, { type }: ArgumentMetadata) {
    if (type === 'body') {
      const post = plainToInstance(CreateTypePostDto[dto.type], dto);
      const errors = await validate(post, { validationError: { target: false }});
      if (errors.length > 0) {
          throw new BadRequestException(errors)
      }
      return dto;
    }
  }
}
