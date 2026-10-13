import { model, Schema } from 'mongoose';

const workoutSchema = new Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    difficulty: { type: String, trim: true },
    durationMinutes: { type: Number, min: 0 },
    exercises: [
      {
        name: { type: String, trim: true },
        sets: { type: Number, min: 0 },
        reps: { type: Number, min: 0 },
      },
    ],
  },
  { timestamps: true, collection: 'workouts' },
);

export default model('Workout', workoutSchema);
