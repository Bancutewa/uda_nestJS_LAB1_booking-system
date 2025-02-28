import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './bookings.sheme';
import { BookingsService } from './bookings.service';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from 'src/guard/roles-guard/roles-guard.guard';
import { AuthGuard } from 'src/guard/auth-guard/auth-guard.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]), // ✅ Import Schema Booking
    JwtModule.register({
      secret: 'tranngoctien101119',
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, AuthGuard, RolesGuard], // ✅ Thêm BookingsService vào providers
})
export class BookingsModule {}
