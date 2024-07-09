import { Module } from '@nestjs/common';
import { ReceiveSignalModule } from './receive-signal/receive-signal.module';
import { ReceiveSignalController } from './receive-signal/receive-signal.controller';

@Module({
    imports: [ReceiveSignalModule],
    controllers: [ReceiveSignalController],
    providers: [],
})
export class AppModule {}
