import SUBWAYSURFERS from '../assets/SubwayGameplay.mp4';

export default function Subway() {
  return (
    <div style={{ position: 'relative'}}>
      <video 
        autoPlay 
        muted 
        loop 
        width="220" 
        style={{
          position: 'absolute',
          bottom: '10px',  // Distância do fundo da tela
          right: '10px',   // Distância da direita da tela
        }}
      >
        <source src={SUBWAYSURFERS} type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
    </div>
  );
}
