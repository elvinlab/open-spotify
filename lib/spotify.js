import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "streaming",
  "user-top-read",
  "user-read-email",
  "user-follow-read",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "playlist-read-private",
  "user-read-playback-state",
  "user-read-recently-played",
  "user-modify-playback-state",
  "playlist-read-collaborative",
  "user-read-currently-playing",
].join(",");

const params = {
  scope: scopes,
};

const queryParamsString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString.toString()}`;

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default spotifyAPI;
export { LOGIN_URL };
