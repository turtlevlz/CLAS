type SpecialtyChipProps = {
  label: string;
};

export default function SpecialtyChip({ label }: SpecialtyChipProps) {
  return (
    <span className="!inline-flex !min-h-[30px] !items-center !rounded-full !bg-[#e7f1fb] !px-[12px] !text-[13px] !font-bold !leading-none !text-[#2d4a73]">
      {label}
    </span>
  );
}
