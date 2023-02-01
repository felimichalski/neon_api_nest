import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Social } from './entities/social.entity';

@Module({
  controllers: [SocialController],
  providers: [SocialService],
  imports: [TypeOrmModule.forFeature([Social])],
})
export class SocialModule {}
