import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/apidatabase");
mongoose.Promise = global.Promise;

export default mongoose;
