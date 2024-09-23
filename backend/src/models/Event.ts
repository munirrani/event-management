import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  location: string;
  status: string;
  description: string;
  thumbnailUrl: string;
}


const EventSchema: Schema = new Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  location: { type: String, required: true },
  status: { type: String, enum: ['Ongoing', 'Completed'], default: 'Ongoing' },
  description: { type: String },
  thumbnailUrl: { type: String, required: true },
});

export const Event = mongoose.model<IEvent>('Event', EventSchema);

