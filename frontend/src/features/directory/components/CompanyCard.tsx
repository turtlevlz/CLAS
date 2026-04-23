import { Link } from 'react-router-dom';

import type { DirectoryCompany } from '../types/directory';
import SpecialtyChip from './SpecialtyChip';
import TierBadge from './TierBadge';

type CompanyCardProps = {
  company: DirectoryCompany;
};

function getCompanyInitials(name: string) {
  const cleanName = name.trim();

  if (cleanName.length < 2) {
    return cleanName.toUpperCase() || 'CL';
  }

  return cleanName.slice(0, 2).toUpperCase();
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const companyInitials = getCompanyInitials(company.name);

  return (
    <Link
      to={`/empresa/${company.id}`}
      aria-label={`Ver detalle de ${company.name}`}
      className="!flex !h-full !min-h-[410px] !flex-col !rounded-[28px] !border !border-[#e7edf5] !bg-white !p-[24px] !shadow-[0_16px_36px_rgba(15,23,42,0.06)] focus:!outline-none focus:!ring-4 focus:!ring-sky-100"
    >
      <div className="!flex !items-start !justify-between !gap-[16px]">
        <div className="!flex !h-[64px] !w-[64px] !shrink-0 !items-center !justify-center !rounded-[18px] !bg-gradient-to-br !from-[#214780] !to-[#3569b3] !text-[17px] !font-bold !tracking-[0.08em] !text-white">
          {companyInitials}
        </div>

        <TierBadge tier={company.tierLabel} />
      </div>

      <div className="!mt-[18px]">
        <h2 className="!text-[24px] !font-bold !leading-[1.08] !tracking-[-0.04em] !text-[#12284b]">
          {company.name}
        </h2>

        <p className="!mt-[14px] !text-[15px] !leading-[1.7] !text-[#64748b]">
          {company.shortDescription}
        </p>
      </div>

      <div className="!mt-[16px] !text-[15px] !leading-[1.7] !text-[#334155]">
        <p className="!font-semibold">
          {company.city}, {company.state}
        </p>
        <p>{company.publicEmail}</p>
        <p>{company.publicPhone}</p>
        <p>{company.employeeRange}</p>
      </div>

      <div className="!mt-[18px] !flex !flex-wrap !gap-[10px]">
        {company.specialties.map((specialty) => (
          <SpecialtyChip key={specialty} label={specialty} />
        ))}
      </div>
    </Link>
  );
}
