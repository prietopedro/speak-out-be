exports.up = function(knex) {
  return knex.schema.createTable("user", tbl => {
    tbl.string("name");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user");
};
