-- Flyway migration: Add full_name column to user table
ALTER TABLE logindetails ADD COLUMN full_name VARCHAR(255);
