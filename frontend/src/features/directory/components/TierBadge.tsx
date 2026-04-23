type TierBadgeProps = {
  label: string;
};

function getTierBadgeClassName(label: string) {
  const normalizedLabel = label.trim().toLowerCase();

  if (normalizedLabel === 'tier 1') {
    return 'directory-tier-badge directory-tier-badge--tier1';
  }

  if (normalizedLabel === 'tier 2') {
    return 'directory-tier-badge directory-tier-badge--tier2';
  }

  if (normalizedLabel === 'tier 3') {
    return 'directory-tier-badge directory-tier-badge--tier3';
  }

  if (normalizedLabel === 'oem') {
    return 'directory-tier-badge directory-tier-badge--oem';
  }

  if (normalizedLabel === 'gobierno') {
    return 'directory-tier-badge directory-tier-badge--government';
  }

  return 'directory-tier-badge directory-tier-badge--default';
}

export default function TierBadge({ label }: TierBadgeProps) {
  return <span className={getTierBadgeClassName(label)}>{label}</span>;
}
