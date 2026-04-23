type SpecialtyChipProps = {
  label: string;
};

export default function SpecialtyChip({ label }: SpecialtyChipProps) {
  return (
    <span className="!inline-flex !min-h-[34px] !items-center !justify-center !rounded-full !bg-[#edf5ff] !px-3.5 !text-[13px] !font-semibold !leading-none !text-[#355070]">
      {label}
    </span>
  );
}