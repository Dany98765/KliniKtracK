/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.sql(`
        CREATE TABLE conditions(
            id SERIAL PRIMARY KEY, 
            user_id INTEGER REFERENCES users (id) NOT NULL, 
            name VARCHAR NOT NULL, 
            description VARCHAR NOT NULL,  
            type VARCHAR NOT NULL, 
            symptoms VARCHAR[] NOT NULL, 
            start_date DATE NOT NULL, 
            end_date DATE NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        ); 
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
        DROP TABLE conditions;    
    `)
};
