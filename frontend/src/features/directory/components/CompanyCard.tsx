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
      className="group !flex !h-full !min-h-[420px] !flex-col !rounded-[30px] !border !border-[#e4ebf5] !bg-white !p-7 !shadow-[0_18px_44px_rgba(15,23,42,0.07)] !transition hover:!-translate-y-[2px] hover:!shadow-[0_24px_58px_rgba(15,23,42,0.10)] focus:!outline-none focus:!ring-4 focus:!ring-sky-100"
    >
      <div className="!flex !min-h-[90px] !items-center !justify-center">
        <div className="!relative !flex !h-[60px] !w-[150px] !items-center !justify-center !overflow-hidden !rounded-[16px] !bg-white">
          {company.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={`Logo de ${company.name}`}
              className="!h-full !w-full !object-contain"
              onError={(event) => {
                const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;

                event.currentTarget.style.display = 'none';

                if (fallback) {
                  fallback.style.display = 'flex';
                }
              }}
            />
          ) : null}

          <span
            className="!hidden !h-full !w-full !items-center !justify-center !text-[22px] !font-bold !tracking-[0.08em] !text-[#12284b]"
          >
            {companyInitials}
          </span>

          {!company.logoUrl ? (
            <span className="!absolute !inset-0 !flex !items-center !justify-center !text-[22px] !font-bold !tracking-[0.08em] !text-[#12284b]">
              {companyInitials}
            </span>
          ) : null}
        </div>
      </div>

      <div className="!mt-5 !text-center">
        <h2 className="!text-[24px] !font-bold !leading-[1.12] !tracking-[-0.04em] !text-[#12284b]">
          {company.name}
        </h2>
      </div>

      <div className="!mt-6 !h-px !w-full !bg-[#e3eaf4]" />

      <div className="!mt-6 !flex-1">
        <p className="!text-center !text-[13px] !font-bold !uppercase !tracking-[0.12em] !text-[#94a3b8]">
          Especialidades
        </p>

        <div className="!mt-4 !flex !flex-wrap !justify-center !gap-2.5">
          {company.specialties.map((specialty) => (
            <SpecialtyChip key={specialty} label={specialty} />
          ))}
        </div>
      </div>

      <div className="!mt-7">
        <TierBadge tier={company.tierLabel} />
      </div>
    </Link>
  );
}
