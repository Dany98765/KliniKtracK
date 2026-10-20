// import pg from "pg";

// let db = {
//     pool: null,
//     connect(options) {
//         this.pool = new pg.Pool(options);
//         console.log("INITIALISING>>>")
//     },
//     // query(text, params) {
//     //     if (pool) {
//     //         console.log("TESTING...")
//     //         return this.pool.query(text, params);
//     //     }
//     // }
//     query(text, params) {
//         if (this.pool) {
//             console.log("TESTING...");
//             return this.pool.query(text, params);
//         }

//         throw new Error("Database pool has not been initialized");
//     }
// }

// export default db;

import pg from "pg";

const db = {
    pool: null,

    connect(options) {
        this.pool = new pg.Pool(options);

        console.log("Pool initialized:", Boolean(this.pool));

        this.pool.on("error", (err) => {
            console.error("Unexpected PostgreSQL pool error:", err);
        });
    },

    async query(text, params) {
        if (!this.pool) {
            throw new Error("Database pool has not been initialized");
        }

        console.log("TESTING...");

        try {
            const result = await this.pool.query(text, params);
            console.log("QUERY SUCCEEDED");
            return result;
        } catch (err) {
            console.error("DATABASE QUERY FAILED:", err);
            throw err;
        }
    }
};

export default db;