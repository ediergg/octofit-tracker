import { model, Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, trim: true },
    description: { type: String, trim: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true, collection: 'teams' },
);

export default model('Team', teamSchema);
