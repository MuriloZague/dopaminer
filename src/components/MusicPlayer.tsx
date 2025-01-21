import { useState, useRef, useEffect } from "react";
import LOFI from '../assets/lofi.gif'

//musicas
import WYS from "../assets/music/WYS.mp3";
import YOU from '../assets/music/you.mp3'
import PM from '../assets/music/532pm.mp3'

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks = [
    {
      title: "Snowman",
      src: WYS,
      href: "https://open.spotify.com/intl-pt/track/5oKzIi5OFGRD8f2oGaHLtj?si=b787f7dead7848ff",
    },
    {
      title: "Thinking of You",
      src: YOU,
      href: "https://open.spotify.com/intl-pt/track/2pZi2b9U8r20AF0Cf3hi2D?si=ca3f43a3c4d54c60",
    },
    {
      title: "5:32pm",
      src: PM,
      href: "https://open.spotify.com/intl-pt/track/7qrBYrivpvfXUPBMmqh3dA?si=d284346b41b34bb0",
    },
  ];

  // Função para alternar reprodução/pausa
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) =>
            console.error("Erro ao tentar reproduzir a música:", err)
          );
      }
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(false); // Para a reprodução ao mudar de música
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
    setIsPlaying(false); // Para a reprodução ao mudar de música
  };

  const volume = 0.35;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  return (
    <div className="music-player px-4 py-[0.10rem] h-52 rounded-md border shadow-lg">
      <h2 className="text-base py-2">
      <a href={tracks[currentTrackIndex].href} target="_blank">
      🎵 {tracks[currentTrackIndex].title}
      </a>
      </h2>
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex].src}
        onEnded={() => nextTrack()} // Avança automaticamente após terminar
      />
      <div className="flex space-x-3">
        <button
          onClick={prevTrack}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ⏪
        </button>
        <button
          onClick={togglePlayPause}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <button
          onClick={nextTrack}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ⏩
        </button>
      </div>
      <img src={LOFI} className="m-auto mt-1" width={120} alt="" />
    </div>
  );
}