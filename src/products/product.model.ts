import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  weight: { type: Number, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  isDeleted: { type: Boolean, required: true },
});

export interface Product extends mongoose.Document {
  //extends este pentru type anntotations in mongoose
  name: string;
  code: string;
  weight: number;
  color: string;
  price: number;
  isDeleted: boolean;
}
