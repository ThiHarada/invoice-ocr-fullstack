import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthController } from './auth/auth.controller';
import { OcrModule } from './ocr/ocr.module';
import { ConfigModule } from '@nestjs/config';
import { InvoiceModule } from './invoice/invoice.module';
import { OcrService } from './ocr/ocr.service';
import {ServeStaticModule} from '@nestjs/serve-static'
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UserModule, 
    OcrModule, 
    ConfigModule.forRoot({ isGlobal: true }), 
    InvoiceModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "../..", "web"),
      exclude: ["api/*"]
    }) 
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, OcrService],
})
export class AppModule {}
