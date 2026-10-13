import mongoose from 'mongoose';
import Activity from '../models/activity.js';
import Leaderboard from '../models/leaderboard.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';
import { connectDatabase } from '../config/database.js';

async function upsertSeedRecord<T>(
  findExisting: () => Promise<T | null>,
  updateExisting: () => Promise<T | null>,
  createRecord: () => Promise<T>,
): Promise<T> {
  const existing = await findExisting();
  if (!existing) {
    return createRecord();
  }

  return (await updateExisting()) ?? existing;
}

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  try {
    await connectDatabase();

    const users = await Promise.all([
      upsertSeedRecord(
        () => User.findOne({ username: 'alex.runner' }),
        () =>
          User.findOneAndUpdate(
            { username: 'alex.runner' },
            { $set: { name: 'Alex Morgan', email: 'alex.morgan@example.com' } },
            { returnDocument: 'after' },
          ),
        () =>
          User.create({
            username: 'alex.runner',
            name: 'Alex Morgan',
            email: 'alex.morgan@example.com',
          }),
      ),
      upsertSeedRecord(
        () => User.findOne({ username: 'sam.cyclist' }),
        () =>
          User.findOneAndUpdate(
            { username: 'sam.cyclist' },
            { $set: { name: 'Sam Rivera', email: 'sam.rivera@example.com' } },
            { returnDocument: 'after' },
          ),
        () =>
          User.create({
            username: 'sam.cyclist',
            name: 'Sam Rivera',
            email: 'sam.rivera@example.com',
          }),
      ),
      upsertSeedRecord(
        () => User.findOne({ username: 'jordan.yoga' }),
        () =>
          User.findOneAndUpdate(
            { username: 'jordan.yoga' },
            { $set: { name: 'Jordan Lee', email: 'jordan.lee@example.com' } },
            { returnDocument: 'after' },
          ),
        () =>
          User.create({
            username: 'jordan.yoga',
            name: 'Jordan Lee',
            email: 'jordan.lee@example.com',
          }),
      ),
    ]);
    const [alex, sam, jordan] = users;

    await Promise.all([
      upsertSeedRecord(
        () => Team.findOne({ name: 'Trail Blazers' }),
        () =>
          Team.findOneAndUpdate(
            { name: 'Trail Blazers' },
            {
              $set: {
                description: 'A running crew focused on consistency and trail miles.',
                members: [alex._id, jordan._id],
              },
            },
            { returnDocument: 'after' },
          ),
        () =>
          Team.create({
            name: 'Trail Blazers',
            description: 'A running crew focused on consistency and trail miles.',
            members: [alex._id, jordan._id],
          }),
      ),
      upsertSeedRecord(
        () => Team.findOne({ name: 'Pedal Pushers' }),
        () =>
          Team.findOneAndUpdate(
            { name: 'Pedal Pushers' },
            {
              $set: {
                description: 'A friendly cycling team that rides every weekend.',
                members: [sam._id, alex._id],
              },
            },
            { returnDocument: 'after' },
          ),
        () =>
          Team.create({
            name: 'Pedal Pushers',
            description: 'A friendly cycling team that rides every weekend.',
            members: [sam._id, alex._id],
          }),
      ),
      upsertSeedRecord(
        () =>
          Activity.findOne({
            user: alex._id,
            type: 'Running',
            date: new Date('2026-10-10T07:00:00.000Z'),
          }),
        () =>
          Activity.findOneAndUpdate(
            {
              user: alex._id,
              type: 'Running',
              date: new Date('2026-10-10T07:00:00.000Z'),
            },
            { $set: { duration: 42, calories: 410 } },
            { returnDocument: 'after' },
          ),
        () =>
          Activity.create({
            user: alex._id,
            type: 'Running',
            duration: 42,
            calories: 410,
            date: new Date('2026-10-10T07:00:00.000Z'),
          }),
      ),
      upsertSeedRecord(
        () =>
          Activity.findOne({
            user: sam._id,
            type: 'Cycling',
            date: new Date('2026-10-11T08:30:00.000Z'),
          }),
        () =>
          Activity.findOneAndUpdate(
            {
              user: sam._id,
              type: 'Cycling',
              date: new Date('2026-10-11T08:30:00.000Z'),
            },
            { $set: { duration: 65, calories: 590 } },
            { returnDocument: 'after' },
          ),
        () =>
          Activity.create({
            user: sam._id,
            type: 'Cycling',
            duration: 65,
            calories: 590,
            date: new Date('2026-10-11T08:30:00.000Z'),
          }),
      ),
      upsertSeedRecord(
        () =>
          Activity.findOne({
            user: jordan._id,
            type: 'Yoga',
            date: new Date('2026-10-12T17:00:00.000Z'),
          }),
        () =>
          Activity.findOneAndUpdate(
            {
              user: jordan._id,
              type: 'Yoga',
              date: new Date('2026-10-12T17:00:00.000Z'),
            },
            { $set: { duration: 35, calories: 150 } },
            { returnDocument: 'after' },
          ),
        () =>
          Activity.create({
            user: jordan._id,
            type: 'Yoga',
            duration: 35,
            calories: 150,
            date: new Date('2026-10-12T17:00:00.000Z'),
          }),
      ),
      upsertSeedRecord(
        () => Leaderboard.findOne({ user: alex._id }),
        () =>
          Leaderboard.findOneAndUpdate(
            { user: alex._id },
            { $set: { points: 860, rank: 1 } },
            { returnDocument: 'after' },
          ),
        () => Leaderboard.create({ user: alex._id, points: 860, rank: 1 }),
      ),
      upsertSeedRecord(
        () => Leaderboard.findOne({ user: sam._id }),
        () =>
          Leaderboard.findOneAndUpdate(
            { user: sam._id },
            { $set: { points: 740, rank: 2 } },
            { returnDocument: 'after' },
          ),
        () => Leaderboard.create({ user: sam._id, points: 740, rank: 2 }),
      ),
      upsertSeedRecord(
        () => Leaderboard.findOne({ user: jordan._id }),
        () =>
          Leaderboard.findOneAndUpdate(
            { user: jordan._id },
            { $set: { points: 625, rank: 3 } },
            { returnDocument: 'after' },
          ),
        () => Leaderboard.create({ user: jordan._id, points: 625, rank: 3 }),
      ),
      upsertSeedRecord(
        () => Workout.findOne({ name: 'Beginner Strength Circuit' }),
        () =>
          Workout.findOneAndUpdate(
            { name: 'Beginner Strength Circuit' },
            {
              $set: {
                description: 'A balanced bodyweight circuit to build foundational strength.',
                difficulty: 'beginner',
                durationMinutes: 30,
                exercises: [
                  { name: 'Bodyweight squats', sets: 3, reps: 12 },
                  { name: 'Push-ups', sets: 3, reps: 8 },
                  { name: 'Glute bridges', sets: 3, reps: 15 },
                ],
              },
            },
            { returnDocument: 'after' },
          ),
        () =>
          Workout.create({
            name: 'Beginner Strength Circuit',
            description: 'A balanced bodyweight circuit to build foundational strength.',
            difficulty: 'beginner',
            durationMinutes: 30,
            exercises: [
              { name: 'Bodyweight squats', sets: 3, reps: 12 },
              { name: 'Push-ups', sets: 3, reps: 8 },
              { name: 'Glute bridges', sets: 3, reps: 15 },
            ],
          }),
      ),
      upsertSeedRecord(
        () => Workout.findOne({ name: 'Tempo Run Prep' }),
        () =>
          Workout.findOneAndUpdate(
            { name: 'Tempo Run Prep' },
            {
              $set: {
                description: 'A short mobility and interval session to support faster running.',
                difficulty: 'intermediate',
                durationMinutes: 40,
                exercises: [
                  { name: 'Dynamic warm-up', sets: 1, reps: 10 },
                  { name: 'Tempo intervals', sets: 5, reps: 3 },
                  { name: 'Cool-down stretch', sets: 1, reps: 8 },
                ],
              },
            },
            { returnDocument: 'after' },
          ),
        () =>
          Workout.create({
            name: 'Tempo Run Prep',
            description: 'A short mobility and interval session to support faster running.',
            difficulty: 'intermediate',
            durationMinutes: 40,
            exercises: [
              { name: 'Dynamic warm-up', sets: 1, reps: 10 },
              { name: 'Tempo intervals', sets: 5, reps: 3 },
              { name: 'Cool-down stretch', sets: 1, reps: 8 },
            ],
          }),
      ),
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase().catch((error: unknown) => {
  console.error('Error disconnecting from octofit_db:', error);
  process.exitCode = 1;
});
