import type { DirectoryCompanyTier } from '../types/directory';

type TierBadgeProps = {
  tier: DirectoryCompanyTier;
};

const tierClassNames: Record<DirectoryCompanyTier, string> = {
  'Tier 1': '!bg-[#1390ff] !text-[#ffffff]',
  'Tier 2': '!bg-[#09487f] !text-[#ffffff]',
  'Tier 3': '!bg-[#0e233e] !text-[#ffffff]',
  OEM: '!bg-[#2e2e2e] !text-[#ffffff]',
  Gobierno: '!bg-[#c4c4c4] !text-[#2e2e2e]',
  Otro: '!bg-[#ececec] !text-[#525252]',
};

export default function TierBadge({ tier }: TierBadgeProps) {
  const className = tierClassNames[tier] ?? tierClassNames.Otro;

  return (
    <span
      className={`!inline-flex !w-fit !items-center !justify-center !rounded-full !px-3.5 !py-1.5 !text-center !text-[13px] !font-bold !leading-none !tracking-[0.04em] ${className}`}
    >
      {tier}
    </span>
  );
}
