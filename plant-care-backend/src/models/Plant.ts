import mongoose, { Document, Schema } from 'mongoose';

export interface IPlant extends Document {
  name: string;
  type: string;
  weeklyWaterNeed: number;
  expectedHumidity: number;
  location?: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

const PlantSchema: Schema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  weeklyWaterNeed: { type: Number, required: true },
  expectedHumidity: { type: Number, required: true },
  location: { type: String },
  latitude: { type: Number },
  longitude: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPlant>('Plant', PlantSchema); 