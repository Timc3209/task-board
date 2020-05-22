import * as mongoose from "mongoose";

const connectDB = async (databaseUrl: string) => {
  try {
    mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    mongoose.connection.on("error", () => {
      throw new Error(`unable to connect to database: ${databaseUrl}`);
    });

    mongoose.connection.on("connected", () => {
      console.log(`connected to database: ${databaseUrl}`);
    });

    mongoose.set("toJSON", { virtuals: true });
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
