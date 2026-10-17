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
    pgm.sql(`CREATE TYPE role_of_action AS ENUM ('Caused', 'Solved');`);
    pgm.sql(`
        CREATE TABLE actions_to_conditions(
            id SERIAL PRIMARY KEY, 
            user_id INTEGER REFERENCES users (id) NOT NULL, 
            action_id INTEGER REFERENCES actions (id) NOT NULL, 
            condition_id INTEGER REFERENCES conditions (id) NOT NULL, 
            role_of_action role_of_action NOT NULL, 
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
        DROP TABLE actions_to_conditions;
        DROP TYPE role_of_action;
    `);
};
