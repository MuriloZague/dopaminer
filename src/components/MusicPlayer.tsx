import { useState, useRef } from "react";

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Índice da música atual
  const audioRef = useRef<HTMLAudioElement>(null); // Referência ao elemento <audio>

  // Lista de músicas
  const tracks = [
    {
      title: "Pinwheel",
      src: "/music/pinwheel.mp3", // Caminho da música
    },
    {
      title: "Sunrise",
      src: "/music/sunrise.mp3",
    },
    {
      title: "Rainforest",
      src: "/music/rainforest.mp3",
    },
  ];

  // Função para ir para a próxima música
  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === tracks.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Função para voltar para a música anterior
  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? tracks.length - 1 : prevIndex - 1
    );
  };

  // Atualiza a música no <audio> quando o índice mudar
  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.load(); // Recarrega o elemento <audio> com a nova música
      audioRef.current.play(); // Inicia a reprodução
    }
  };

  return (
    <div className="music-player flex flex-col items-center p-4 border rounded-md">
      <h2 className="text-lg font-bold mb-2">
        🎵 {tracks[currentTrackIndex].title}
      </h2>
      <audio
        ref={audioRef}
        onLoadedMetadata={handlePlay} // Reproduz quando carregar
        controls
      >
        <source src={tracks[currentTrackIndex].src} type="audio/mpeg" />
        Seu navegador não suporta o player de áudio.
      </audio>
      <div className="controls flex mt-2 space-x-4">
        <button
          onClick={prevTrack}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ⏪ Anterior
        </button>
        <button
          onClick={nextTrack}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ⏩ Próxima
        </button>
      </div>
    </div>
  );
}
