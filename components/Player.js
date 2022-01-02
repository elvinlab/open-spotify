import {
  HeartIcon,
  VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { debounce } from "lodash";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { UseSongInfo } from "../hooks/UseSongInfo";
import { UseSpotify } from "../hooks/UseSpotify";

export const Player = () => {
  const spotifyAPI = UseSpotify();
  const { data: session } = useSession();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);

  const [volume, setVolume] = useState(50);

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const songInfo = UseSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyAPI.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id);
        spotifyAPI.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.item?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyAPI.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyAPI.pause();
        setIsPlaying(false);
      } else {
        spotifyAPI.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyAPI.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyAPI, session]);

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume);
    }
  }, [volume]);

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyAPI.setVolume(volume).catch((err) => {});
    }, 500),
    []
  );

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img
          className="hidden md:inline h-10 w-10"
          src={
            songInfo?.album.images?.[0]?.url
              ? songInfo?.album.images?.[0]?.url
              : "https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1"
          }
          alt="Song info"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name} </p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
        )}
        <FastForwardIcon className="button" />

        <ReplyIcon className="button" />
      </div>

      <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
        <VolumeDownIcon
          onClick={() => volume > 0 && setVolume(volume - 10)}
          className="button"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
};
