import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Venue, VenueDocument } from './venus.scheme';

@Injectable()
export class VenuesService {
  constructor(
    @InjectModel(Venue.name) private venueModel: Model<VenueDocument>,
  ) {}

  async create(name: string, location: string): Promise<VenueDocument> {
    return new this.venueModel({ name, location }).save();
  }

  async update(id: string, updateData: Partial<Venue>): Promise<VenueDocument> {
    const venue = await this.venueModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!venue) throw new NotFoundException('Venue not found');
    return venue;
  }

  async remove(id: string): Promise<void> {
    const result = await this.venueModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Venue not found');
  }

  async findAll(): Promise<Venue[]> {
    return this.venueModel.find().exec();
  }
}
