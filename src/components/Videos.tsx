interface VideoProps {
  width: string;
  height: string;
  bottom: string;
  right: string;
  left: string;
  src: string;
}

export default function Videos({ width, height, bottom, right, left, src }: VideoProps) {
  return (
    <div style={{ position: 'relative' }}>
      <iframe
        src={src}
        width={width}
        height={height}
        allow="autoplay; muted"
        style={{
          position: 'absolute',
          bottom:`${bottom}`,
          right:`${right}`,
          left: `${left}`
        }}
      ></iframe>
    </div>
  );
}
