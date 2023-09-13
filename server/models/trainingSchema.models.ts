import db from './db';
import { Model } from 'mongoose';
import { ITrainings } from '../interfaces';

const trainingsSchema = new db.Schema<ITrainings>({
  date: {
    type: Date,
    require: true
  },
  distance: {
    type: Number,
    require: true
  },
  kmToIncrease: {
    type: Number,
    require: true
  },
  feedback: {
    type: String,
    require: false
  }
})

const Training: Model<ITrainings> = db.model<ITrainings>('Training', trainingsSchema)

export default Training;