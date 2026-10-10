import pg from "pg";

let db = {
    pool: null, 
    connect(options){
        this.pool = new pg.Pool(options);
    }, 
    query(text, params){
        return this.pool.query(text, params);
    }
}

export default db;