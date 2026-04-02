/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // Tarifler tablosu
    .createTable('tarifler', tbl => {
      tbl.increments('tarif_id');
      tbl.string('tarif_adi', 255).notNullable().unique();
      tbl.timestamp('kayit_tarihi').defaultTo(knex.fn.now());
    })
    // İçindekiler tablosu
    .createTable('icindekiler', tbl => {
      tbl.increments('icindekiler_id');
      tbl.string('icindekiler_adi', 255).notNullable().unique();
    })
    // Adımlar tablosu
    .createTable('adimlar', tbl => {
      tbl.increments('adim_id');
      tbl.integer('tarif_id')
        .unsigned()
        .notNullable()
        .references('tarif_id')
        .inTable('tarifler')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('adim_sirasi').notNullable();
      tbl.text('adim_talimati').notNullable();
    })
    // Adım içindekiler tablosu (many-to-many)
    .createTable('adim_icindekiler', tbl => {
      tbl.increments('id');
      tbl.integer('adim_id')
        .unsigned()
        .notNullable()
        .references('adim_id')
        .inTable('adimlar')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.integer('icindekiler_id')
        .unsigned()
        .notNullable()
        .references('icindekiler_id')
        .inTable('icindekiler')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      tbl.float('miktar').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('adim_icindekiler')
    .dropTableIfExists('adimlar')
    .dropTableIfExists('icindekiler')
    .dropTableIfExists('tarifler');
};
