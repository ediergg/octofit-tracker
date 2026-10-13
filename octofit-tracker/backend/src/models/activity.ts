import { model, Schema } from 'mongoose';

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, trim: true },
    duration: { type: Number, min: 0 },
    calories: { type: Number, min: 0 },
    date: { type: Date },
  },
  { timestamps: true, collection: 'activities' },
);

export default model('Activity', activitySchema);
