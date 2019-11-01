exports.up = function(knex) {
  return knex.schema
    .createTable("term", table => {
      table.increments();
      table.text("name").notNullable();
      table.integer("subsection").notNullable();
      table.timestamps(true, true);
    })
    .createTable("course_type", table => {
      table.increments();
      table
        .text("description")
        .notNullable()
        .unique();
      table.timestamps(true, true);
    })
    .createTable("pacing_guide", table => {
      table.increments();
      table.text("name").notNullable();
      table.text("section").notNullable();
      table.integer("lesson").notNullable();
      table.text("content").notNullable();
      table.timestamps(true, true);
    })
    .createTable("level", table => {
      table.increments();
      table
        .text("textbook")
        .notNullable()
        .unique();
      table
        .text("description")
        .notNullable()
        .unique();
      table.text("cef_equivalent").notNullable();
      table
        .integer("pacing_guide_id")
        .unsigned()
        .references("id")
        .inTable("pacing_guide")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.text("certificate_text").notNullable();
      table.timestamps(true, true);
    })
    .createTable("course_schedule", table => {
      table.increments();
      table
        .text("short_description")
        .notNullable()
        .unique();
      table
        .text("long_description")
        .notNullable()
        .unique();
      table
        .text("sql")
        .notNullable()
        .unique();
      table.timestamps(true, true);
    })
    .createTable("room", table => {
      table.increments();
      table.integer("chairs");
      table.text("availability");
      table.timestamps(true, true);
    })
    .createTable("staff", table => {
      table.increments();
      table.text("name").notNullable();
      table.text("short_name").notNullable();
      table.text("cpr");
      table.text("mobile_number");
      table.text("email");
      table.text("accent");
      table.text("gender").notNullable();
      table.date("birthdate");
      table.text("teaching_rate");
      table.boolean("admin");
      table.boolean("active");
      table.timestamps(true, true);
    })
    .createTable("courses", table => {
      table.increments();
      table
        .integer("term_id")
        .unsigned()
        .references("id")
        .inTable("term")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("course_type_id")
        .unsigned()
        .references("id")
        .inTable("course_type")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("group_type_id")
        .unsigned()
        .references("id")
        .inTable("grouptype")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("grade_id")
        .unsigned()
        .references("id")
        .inTable("school_grades")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("level_id")
        .unsigned()
        .references("id")
        .inTable("level")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.text("section");
      table.integer("subsection");
      table.text("hourly_rate");
      table
        .integer("schedule_id")
        .unsigned()
        .references("id")
        .inTable("course_schedule")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table
        .integer("room_id")
        .unsigned()
        .references("id")
        .inTable("room")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.time("start_time");
      table.time("end_time");
      table
        .integer("teacher_id")
        .unsigned()
        .references("id")
        .inTable("staff")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.text("notes");
      table.text("status");
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("courses")
    .dropTable("staff")
    .dropTable("room")
    .dropTable("course_schedule")
    .dropTable("level")
    .dropTable("pacing_guide")
    .dropTable("course_type")
    .dropTable("term");
};
