import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "https://deepin-ai-saas.vercel.app",
      "https://deepin-backend-production.up.railway.app",
    ],
    credentials: true,
  });

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);
  console.log(`Nest application running on: http://localhost:${port}`);
}
bootstrap();
