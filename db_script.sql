CREATE TABLE IF NOT EXISTS saved_tracks (
  track_name VARCHAR(255),                /* Name of Track            */
  artist_name VARCHAR(255),               /* Name of Track Artist     */
  track_type VARCHAR(255),                /* Type of Track            */
  track_genre VARCHAR(255),               /* Genre of Track           */
  release_date DATE NOT NULL              /* Track Release Date       */
);