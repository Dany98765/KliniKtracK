import pg from "pg";

let db = {
    pool: null,
    connect(options) {
        this.pool = new pg.Pool(options);
        console.log("INITIALISING>>>")
    },
    // query(text, params) {
    //     if (pool) {
    //         console.log("TESTING...")
    //         return this.pool.query(text, params);
    //     }
    // }
    query(text, params) {
        if (this.pool) {
            console.log("TESTING...");
            return this.pool.query(text, params);
        }

        throw new Error("Database pool has not been initialized");
    }
}

export default db;