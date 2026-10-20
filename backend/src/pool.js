import pg from "pg";

let db = {
    pool: null, 
    connect(options){
        this.pool = new pg.Pool(options);
        console.log("INITIALISING>>>")
    }, 
    query(text, params){
        console.log("TESTING...")
        return this.pool.query(text, params);
    }
}

export default db;