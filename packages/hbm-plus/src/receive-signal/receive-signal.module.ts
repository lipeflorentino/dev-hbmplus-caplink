import { Module } from '@nestjs/common';
import { ReceiveSignalController } from './receive-signal.controller';

@Module({
  controllers: [ReceiveSignalController]
})
export class ReceiveSignalModule {}
