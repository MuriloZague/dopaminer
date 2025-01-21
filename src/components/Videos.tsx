interface VideoProps {
  width: string;
  height: string;
  bottom: string;
  right: string;
  src: string;
}

export default function Videos({ width, height, bottom, right, src }: VideoProps) {
  return (
    <div style={{ position: 'relative' }}>
      <iframe
        src={src}
        width={width}
        height={height}
        allow="autoplay; muted"
        style={{
          position: 'absolute',
          bottom:`${bottom}px`,
          right:`${right}px`,
        }}
      ></iframe>
    </div>
  );
}
