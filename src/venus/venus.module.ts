import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { Venue, VenueSchema } from './venus.scheme';
import { VenuesController } from './venus.controller';
import { VenuesService } from './venus.service';
import { AuthGuard } from 'src/guard/auth-guard/auth-guard.guard';
import { RolesGuard } from 'src/guard/roles-guard/roles-guard.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Venue.name, schema: VenueSchema }]), // ✅ Đăng ký model Venue
    JwtModule.register({
      // ✅ Thêm JwtModule để AuthGuard có thể sử dụng JwtService
      secret: 'tranngoctien101119',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [VenuesController],
  providers: [VenuesService, AuthGuard, RolesGuard], // ✅ Đăng ký Guards
})
export class VenuesModule {}
