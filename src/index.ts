import express from "express";

import router from "./router";

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.info(`MongoDb API running on port ${PORT}`);
});
