import app from "./src/app.js";
import db from "./src/pool.js";

db.connect({
    host: process.env.PGHOST, 
    port: process.env.PGPORT, 
    database: process.env.PGDATABASE, 
    user: process.env.PGUSER, 
    password: process.env.PGPASSWORD
    // connectionString: process.env.PGCONNECTIONSTRING
});

app.listen(process.env.PORT, () => {console.log("listening on port " + process.env.PORT)});