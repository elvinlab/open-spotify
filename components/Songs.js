import { playlistState } from "./../atoms/playlistAtom";
import { useRecoilValue } from "recoil";
import { Song } from "./Song";

export const Songs = () => {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-8 flex-col space-y-1 pb-2 text-white">
      {playlist?.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
      ))}
    </div>
  );
};
