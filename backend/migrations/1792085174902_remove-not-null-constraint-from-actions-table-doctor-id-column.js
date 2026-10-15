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
        ALTER TABLE actions ALTER COLUMN doctor_id DROP NOT NULL;    
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    console.log(JSON.stringify({ "error source": "/backend/migrations/1792085174902_remove-not-null-constraint-from-actions-table-doctor-id-column.js, down", "error cause": "reverting a database migration", "error message/details": "cannot revert migration as it requires inserting placeholder foregin keys" }));
};
