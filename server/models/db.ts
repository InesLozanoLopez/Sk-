import mongoose, {Connection} from 'mongoose';
const url = 'mongodb://localhost:27017';
const dbName = 'Profilesdb';
const db = `${url}/${dbName}`;

let connection: Connection | null = null;

export async function bootstrap(): Promise<Connection> {
  try {
    await mongoose.connect(db);
    console.log(`Mongoose connected and running`);
    return connection!;

  } catch (e) {
    console.log('Error connecting Mongoose', e);
    throw e;
  }
}

bootstrap();

export default mongoose;