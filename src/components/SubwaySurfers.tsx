import SUBWAYSURFERS from '../assets/SubwayGameplay.mp4';

export default function Subway() {
  return (
    <div style={{ position: 'relative' }}>
      <video
        autoPlay
        muted
        loop
        width="200"
        style={{
          position: 'absolute',
          bottom: '0px',
          right: '10px',
        }}
      >
        <source src={SUBWAYSURFERS} type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
    </div>
  );
}
