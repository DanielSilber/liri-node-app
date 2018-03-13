
console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY, //xSvdjpzKhlcmeMFr8uHriPrnz
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET, //PvNewuZRwwGRYnCL8OJEm5nouWzbd1wktHbKOWKAlBgrBRjBfG
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY, //972356685175013376-3WPUD9jzo109nNTXRxPM7zM02yqbSUf
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET //972356685175013376-3WPUD9jzo109nNTXRxPM7zM02yqbSUf
};

exports.spotify = {
  id: process.env.SPOTIFY_ID, //7ad998417cce4cbcbdfccccff8cd14be
  secret: process.env.SPOTIFY_SECRET //0634afed05354f4086bd438f58a26f5c
};
