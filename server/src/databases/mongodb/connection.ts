import mongoose from "mongoose";

export default async function mongoDBConnection() {
  try {
    mongoose.set("strictQuery", false);

    const databaleUrl = process.env.DEV_DATABASE;

    if (!databaleUrl) throw Error("Cannot find URL");

    await mongoose.connect(databaleUrl);

    return { error: false, message: "✔ MongoDB connected" };
  } catch (error) {
    return { error: true, message: error };
  }
}
