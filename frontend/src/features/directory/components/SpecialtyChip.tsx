type SpecialtyChipProps = {
  label: string;
};

export default function SpecialtyChip({ label }: SpecialtyChipProps) {
  return <span className="directory-specialty-chip">{label}</span>;
}
