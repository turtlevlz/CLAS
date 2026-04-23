import type { DirectoryCompanyTier } from '../types/directory';

type TierBadgeProps = {
  tier: DirectoryCompanyTier;
};

const tierClassNames: Record<DirectoryCompanyTier, string> = {
  'Tier 1': '!bg-[#e9eef5] !text-[#475569]',
  'Tier 2': '!bg-[#e3f2ff] !text-[#0f8ae7]',
  'Tier 3': '!bg-[#def7ea] !text-[#15803d]',
  OEM: '!bg-[#fdf0d5] !text-[#c97b00]',
  Gobierno: '!bg-[#ececec] !text-[#525252]',
  Otro: '!bg-[#ececec] !text-[#525252]',
};

export default function TierBadge({ tier }: TierBadgeProps) {
  const className = tierClassNames[tier] ?? tierClassNames.Otro;

  return (
    <span
      className={`!inline-flex !min-h-[34px] !items-center !rounded-full !px-[14px] !text-[12px] !font-bold !leading-none !tracking-[0.03em] !uppercase ${className}`}
    >
      {tier}
    </span>
  );
}
