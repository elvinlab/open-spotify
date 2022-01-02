import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState } from "../atoms/songAtom";
import { UseSpotify } from "./UseSpotify";

export const UseSongInfo = () => {
  const spotifyAPI = UseSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
            },
          }
        ).then((res) => res.json());

        setSongInfo(trackInfo);
      }
    };
    fetchSongInfo();
  }, [currentTrackId, spotifyAPI]);

  return songInfo;
};
