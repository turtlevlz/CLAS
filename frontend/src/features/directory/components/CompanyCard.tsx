import SpecialtyChip from './SpecialtyChip';
import TierBadge from './TierBadge';
import type { DirectoryCompany } from '../types/directory';

type CompanyCardProps = {
  company: DirectoryCompany;
};

export default function CompanyCard({ company }: CompanyCardProps) {
  const companyLocation = `${company.city}, ${company.state}`;

  return (
    <article className="directory-company-card">
      <div className="directory-company-card__header">
        <div className="directory-company-card__logo" aria-hidden="true">
          {company.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={`Logo de ${company.name}`}
              className="directory-company-card__logo-image"
            />
          ) : (
            <span className="directory-company-card__logo-fallback">
              {company.name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        <TierBadge label={company.tierLabel} />
      </div>

      <div className="directory-company-card__body">
        <h3 className="directory-company-card__title">{company.name}</h3>
        <p className="directory-company-card__description">
          {company.shortDescription}
        </p>

        <div className="directory-company-card__meta">
          <p className="directory-company-card__meta-item">{companyLocation}</p>
          <p className="directory-company-card__meta-item">{company.publicEmail}</p>
          <p className="directory-company-card__meta-item">{company.publicPhone}</p>
          <p className="directory-company-card__meta-item">{company.employeeRange}</p>
        </div>

        <div className="directory-company-card__specialties">
          {company.specialties.map((specialty) => (
            <SpecialtyChip key={specialty} label={specialty} />
          ))}
        </div>
      </div>
    </article>
  );
}
