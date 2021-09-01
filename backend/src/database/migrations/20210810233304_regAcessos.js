
exports.up = function(knex) {
 return knex.schema.createTable('registros', function(table) {
      table.increments();
      table.string('pais').notNullable();
      table.string('datab').notNullable();
  })
};

exports.down = function(knex) {
 return  knex.schema.dropTable('registros');
};
