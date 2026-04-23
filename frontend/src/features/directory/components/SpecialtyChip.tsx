type SpecialtyChipProps = {
  label: string;
};

export default function SpecialtyChip({ label }: SpecialtyChipProps) {
  return (
    <span className="inline-flex min-h-7.5 items-center rounded-full bg-[#e7f1fb] px-3! text-[13px] font-bold leading-none text-[#2d4a73]">
      {label}
    </span>
  );
}
