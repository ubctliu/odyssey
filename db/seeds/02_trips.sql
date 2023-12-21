DROP TABLE IF EXISTS trips CASCADE;

CREATE TABLE trips (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  location VARCHAR(255),
  start_date DATE,
  end_date DATE,
  notes TEXT
);