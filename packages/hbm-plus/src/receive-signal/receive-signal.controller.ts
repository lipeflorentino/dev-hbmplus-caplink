import { Body, Controller, Post } from '@nestjs/common';

@Controller('receive-signal')
export class ReceiveSignalController {
    @Post()
    receiveSignal(@Body() body: any): string {
        const { signal } = body;
        if (signal === 'bip' || signal === 'bipbip') {
            console.log(`Received signal: ${signal}`);
            return `Signal received: ${signal}`;
        }
        return 'Invalid signal';
    }
}
