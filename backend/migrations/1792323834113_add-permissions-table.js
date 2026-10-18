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
        CREATE TYPE scope AS ENUM ('Read only', 'Write only', 'Read and write');
        CREATE TYPE current_status AS ENUM ('Pending', 'Granted', 'Aborted');
    `);
    pgm.sql(`
        CREATE TABLE permissions(
            id SERIAL PRIMARY KEY, 
            patient_name VARCHAR NOT NULL, 
            patient_id INTEGER REFERENCES users (id) NOT NULL, 
            doctor_name VARCHAR NOT NULL, 
            doctor_id INTEGER REFERENCES users (id) NOT NULL, 
            scope scope NOT NULL, 
            current_status current_status NOT NULL DEFAULT 'Pending', 
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
        DROP TABLE permissions;
        DROP TYPE scope;
        DROP TYPE current_status;
    `);
};
