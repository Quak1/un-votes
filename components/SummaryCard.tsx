interface SummaryCardProps {
  title: string;
  value: string | number;
}

const SummaryCard = ({ title, value }: SummaryCardProps) => {
  return (
    <div>
      {title} {value}
    </div>
  );
};

export default SummaryCard;
