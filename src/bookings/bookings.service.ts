import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './bookings.sheme';

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}

  async create(
    userId: string,
    date: string,
    time: string,
  ): Promise<BookingDocument> {
    return new this.bookingModel({ userId, date, time }).save();
  }

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookingModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Booking not found');
  }
  async checkAvailability(
    date: string,
    time: string,
  ): Promise<{ available: boolean }> {
    const existingBooking = await this.bookingModel
      .findOne({ date, time })
      .exec();
    return { available: !existingBooking }; // Nếu không có booking nào, trả về true (khung giờ trống)
  }

  async updateStatus(id: string, status: string): Promise<BookingDocument> {
    const validStatus = ['confirmed', 'rejected'];
    if (!validStatus.includes(status)) {
      throw new BadRequestException('Invalid status');
    }

    const booking = await this.bookingModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!booking) throw new NotFoundException('Booking not found');

    return booking;
  }
}
