'use client';

type Props = {
  text: string;
  lines?: number;
  className?: string;
};

const TypographyEllipsis = ({ text, lines = 1, className }: Props) => {
  const style = {
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical' as const,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  };

  return (
    <div style={style} className={className}>
      {text}
    </div>
  );
};

export default TypographyEllipsis;

