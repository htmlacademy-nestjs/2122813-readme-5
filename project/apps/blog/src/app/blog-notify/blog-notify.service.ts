import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { ConfigType } from '@nestjs/config';
import { rabbitConfig } from '@project/config/config-blog';
import { RabbitRouting } from '@project/shared/app-types';
import { SendNotifyDto } from './dto/send-notify.dto';

@Injectable()
export class BlogNotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
    ) { }

    public async sendNews(dto: SendNotifyDto) {
    return this.rabbitClient.publish<SendNotifyDto>(
      this.rabbitOptions.exchange,
      RabbitRouting.SendNotify,
      { ...dto }
    );
  }
}
