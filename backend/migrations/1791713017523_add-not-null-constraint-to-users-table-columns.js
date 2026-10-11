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
        UPDATE users SET name = '' WHERE name IS NULL;
        UPDATE users SET email = ('email_' || id) WHERE email IS NULL;
        UPDATE users SET password = '' WHERE password IS NULL;
        UPDATE users SET role = 'Patient' WHERE role IS NULL;    
    `);

    pgm.sql(`
        ALTER TABLE users ALTER COLUMN name SET NOT NULL;
        ALTER TABLE users ALTER COLUMN email SET NOT NULL;
        ALTER TABLE users ALTER COLUMN password SET NOT NULL;
        ALTER TABLE users ALTER COLUMN role SET NOT NULL;    
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
        ALTER TABLE users ALTER COLUMN name DROP NOT NULL;
        ALTER TABLE users ALTER COLUMN email DROP NOT NULL;
        ALTER TABLE users ALTER COLUMN password DROP NOT NULL;
        ALTER TABLE users ALTER COLUMN role DROP NOT NULL;    
    `);
};
