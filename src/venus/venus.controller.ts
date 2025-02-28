import {
  Controller,
  Post,
  Patch,
  Delete,
  Get,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth-guard/auth-guard.guard';
import { RolesGuard } from 'src/guard/roles-guard/roles-guard.guard';
import { VenuesService } from './venus.service';

@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  // ✅ Thêm địa điểm (Chỉ Admin/Staff)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async create(@Body() body: { name: string; location: string }) {
    return this.venuesService.create(body.name, body.location);
  }

  // ✅ Chỉnh sửa địa điểm
  @UseGuards(AuthGuard, RolesGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { name?: string; location?: string },
  ) {
    return this.venuesService.update(id, body);
  }

  // ✅ Xóa địa điểm
  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.venuesService.remove(id);
  }

  // ✅ Xem danh sách địa điểm khả dụng (Ai cũng có thể xem)
  @Get()
  async findAll() {
    return this.venuesService.findAll();
  }
}
