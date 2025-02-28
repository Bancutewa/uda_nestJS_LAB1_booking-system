import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  Req,
  Patch,
  Put,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AuthGuard } from 'src/guard/auth-guard/auth-guard.guard';
import { RolesGuard } from 'src/guard/roles-guard/roles-guard.guard';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  // ✅ Mọi user có thể tạo đặt chỗ
  @UseGuards(AuthGuard)
  @Post()
  async create(@Req() req, @Body() body: { date: string; time: string }) {
    const userId = req.user.userId;
    return this.bookingsService.create(userId, body.date, body.time);
  }

  // ✅ Chỉ admin mới có quyền xem danh sách đặt chỗ
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return this.bookingsService.findAll();
  }

  // ✅ Chỉ admin mới có quyền hủy đặt chỗ
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }

  // ✅ Kiểm tra khung giờ trống (Mọi người đều có thể kiểm tra)
  @Get('/availability')
  async checkAvailability(
    @Query('date') date: string,
    @Query('time') time: string,
  ) {
    return this.bookingsService.checkAvailability(date, time);
  }

  // ✅ Xác nhận hoặc từ chối đặt chỗ
  @UseGuards(AuthGuard, RolesGuard)
  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() body: { status: string },
  ) {
    return this.bookingsService.updateStatus(id, body.status);
  }
}
