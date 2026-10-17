import app from "./src/app.js";
import db from "./src/pool.js";

db.connect();

app.listen(process.env.PORT, () => {console.log("listening on port " + process.env.PORT)});