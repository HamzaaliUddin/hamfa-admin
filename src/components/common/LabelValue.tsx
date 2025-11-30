'use client';

type Props = {
  label: string;
  value: string | number | React.ReactNode;
  className?: string;
};

const LabelValue = ({ label, value, className }: Props) => {
  return (
    <div className={className}>
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-base">{value}</p>
    </div>
  );
};

export default LabelValue;

