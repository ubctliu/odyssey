DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  days_id INTEGER REFERENCES days(id) ON DELETE CASCADE,
  location VARCHAR(255),
  time_start timestamp,
  time_end timestamp,
  notes TEXT
);
