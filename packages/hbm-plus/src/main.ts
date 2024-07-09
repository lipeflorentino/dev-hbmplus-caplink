import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startSimulator } from './simulator/simulator';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log('Server is running on http://localhost:3000');
    startSimulator(5); // Iniciar o simulador ao iniciar o servidor
}

bootstrap();
