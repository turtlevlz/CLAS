import { Link, useParams } from 'react-router-dom';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { mockCompanies } from '../features/directory/data/mockCompanies';

function getCompanyInitials(name: string) {
  const cleanName = name.trim();

  if (cleanName.length < 2) {
    return cleanName.toUpperCase() || 'CL';
  }

  return cleanName.slice(0, 2).toUpperCase();
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="!grid !gap-3 sm:!grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="!rounded-[18px] !border !border-[#e5edf7] !bg-white !px-4 !py-3 !text-[14px] !font-semibold !leading-[1.35] !text-[#334155] !shadow-[0_10px_28px_rgba(15,23,42,0.04)]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function SectionCard({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="!rounded-[32px] !border !border-[#e5edf7] !bg-white !p-7 !shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <p className="!text-[12px] !font-bold !uppercase !tracking-[0.14em] !text-[#1181e5]">
        {eyebrow}
      </p>

      <h2 className="!mt-3 !text-[28px] !font-bold !leading-[1] !tracking-[-0.04em] !text-[#12284b]">
        {title}
      </h2>

      <div className="!mt-5">{children}</div>
    </section>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="!border-b !border-[#e5edf7] !py-4 last:!border-b-0">
      <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
        {label}
      </dt>
      <dd className="!mt-1 !text-[15px] !font-semibold !leading-[1.45] !text-[#1f3350]">
        {value}
      </dd>
    </div>
  );
}

export default function EmpresaDetalle() {
  const { id } = useParams();
  const companyId = Number(id);
  const company = mockCompanies.find((currentCompany) => currentCompany.id === companyId);

  if (!company) {
    return (
      <>
        <Navbar />

        <main className="!min-h-[70vh] !bg-[#f8fbff]">
          <section className="!mx-auto !max-w-[980px] !px-6 !py-20">
            <Link
              to="/directorio"
              className="!inline-flex !items-center !rounded-full !bg-white !px-5 !py-2.5 !text-[14px] !font-bold !text-[#12284b] !no-underline !shadow-[0_12px_30px_rgba(15,23,42,0.08)] focus:!outline-none focus:!ring-4 focus:!ring-sky-100"
            >
              ← Volver al directorio
            </Link>

            <div className="!mt-10 !rounded-[36px] !border !border-[#e5edf7] !bg-white !p-9 !shadow-[0_22px_70px_rgba(15,23,42,0.08)]">
              <p className="!text-[12px] !font-bold !uppercase !tracking-[0.14em] !text-[#1181e5]">
                Sin resultados
              </p>

              <h1 className="!mt-4 !text-[48px] !font-bold !leading-none !tracking-[-0.05em] !text-[#12284b]">
                Empresa no encontrada
              </h1>

              <p className="!mt-5 !max-w-[620px] !text-[18px] !leading-[1.7] !text-[#64748b]">
                Regresa al directorio para seleccionar otro miembro disponible.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  const companyInitials = getCompanyInitials(company.name);
  const displayName = company.detail.displayName ?? company.name;

  return (
    <>
      <Navbar />

      <main className="!overflow-hidden !bg-[radial-gradient(circle_at_top_right,rgba(17,129,229,0.17),transparent_34%),linear-gradient(180deg,#f8fbff_0%,#ffffff_42%)]">
        <section className="!mx-auto !max-w-[1180px] !px-6 !pb-20 !pt-10">
          <Link
            to="/directorio"
            className="!inline-flex !items-center !rounded-full !bg-white !px-5 !py-2.5 !text-[14px] !font-bold !text-[#12284b] !no-underline !shadow-[0_12px_30px_rgba(15,23,42,0.08)] !transition hover:!-translate-y-[1px] hover:!shadow-[0_16px_36px_rgba(15,23,42,0.12)] focus:!outline-none focus:!ring-4 focus:!ring-sky-100"
          >
            ← Directorio
          </Link>

          <header className="!relative !mt-8 !rounded-[42px] !border !border-[#e5edf7] !bg-white/90 !p-8 !shadow-[0_28px_90px_rgba(15,23,42,0.09)] lg:!p-10">
            <div className="!absolute !right-8 !top-8 !hidden !rounded-full !bg-[#e5effa] !px-4 !py-2 !text-[12px] !font-bold !uppercase !tracking-[0.08em] !text-[#213854] sm:!inline-flex">
              {company.tierLabel}
            </div>

            <div className="!grid !gap-8 lg:!grid-cols-[minmax(0,1fr)_320px] lg:!items-center">
              <div>
                <div className="!inline-flex !rounded-full !bg-[#e5effa] !px-4 !py-2 !text-[12px] !font-bold !uppercase !tracking-[0.12em] !text-[#213854]">
                  {company.categoryLabel}
                </div>

                <h1 className="!mt-6 !max-w-[760px] !text-[clamp(48px,6vw,86px)] !font-bold !leading-[0.9] !tracking-[-0.06em] !text-[#12284b]">
                  {displayName}
                </h1>

                <p className="!mt-6 !max-w-[780px] !text-[20px] !leading-[1.65] !text-[#64748b]">
                  {company.detail.about}
                </p>
              </div>

              <div className="!flex !justify-start lg:!justify-end">
                <div className="!relative !flex !h-[150px] !w-[260px] !items-center !justify-center !overflow-hidden !rounded-[34px] !border !border-[#e5edf7] !bg-white !p-6 !shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={`Logo de ${company.name}`}
                      className="!h-full !w-full !object-contain !p-6"
                      onError={(event) => {
                        const fallback = event.currentTarget.nextElementSibling as HTMLElement | null;

                        event.currentTarget.style.display = 'none';

                        if (fallback) {
                          fallback.style.display = 'flex';
                        }
                      }}
                    />
                  ) : null}

                  <span className="!hidden !h-full !w-full !items-center !justify-center !text-[42px] !font-bold !tracking-[0.08em] !text-[#12284b]">
                    {companyInitials}
                  </span>

                  {!company.logoUrl ? (
                    <span className="!absolute !inset-0 !flex !items-center !justify-center !text-[42px] !font-bold !tracking-[0.08em] !text-[#12284b]">
                      {companyInitials}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </header>

          <div className="!mt-8 !grid !gap-6 lg:!grid-cols-[minmax(0,1fr)_360px]">
            <div className="!space-y-6">
              <SectionCard eyebrow="Perfil" title="Información general">
                <dl className="!grid !gap-4 sm:!grid-cols-2">
                  <div className="!rounded-[22px] !bg-[#f5f9ff] !p-5">
                    <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
                      Dirección
                    </dt>
                    <dd className="!mt-2 !text-[15px] !font-semibold !leading-[1.55] !text-[#334155]">
                      {company.detail.address}
                    </dd>
                  </div>

                  <div className="!rounded-[22px] !bg-[#f5f9ff] !p-5">
                    <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
                      Giro
                    </dt>
                    <dd className="!mt-2 !text-[15px] !font-semibold !leading-[1.55] !text-[#334155]">
                      {company.detail.businessLine}
                    </dd>
                  </div>

                  <div className="!rounded-[22px] !bg-[#f5f9ff] !p-5">
                    <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
                      Fundación
                    </dt>
                    <dd className="!mt-2 !text-[15px] !font-semibold !leading-[1.55] !text-[#334155]">
                      {company.detail.foundedYear}
                    </dd>
                  </div>

                  <div className="!rounded-[22px] !bg-[#f5f9ff] !p-5">
                    <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
                      Empleados
                    </dt>
                    <dd className="!mt-2 !text-[15px] !font-semibold !leading-[1.55] !text-[#334155]">
                      {company.employeeRange}
                    </dd>
                  </div>
                </dl>
              </SectionCard>

              <SectionCard eyebrow="Oferta" title="Productos y servicios">
                <DetailList items={company.detail.productsAndServices} />
              </SectionCard>

              <SectionCard eyebrow="Operación" title="Capacidades de manufactura">
                <DetailList items={company.detail.manufacturingCapabilities} />
              </SectionCard>

              <SectionCard eyebrow="Proveeduría" title="Necesidades actuales">
                <div className="!rounded-[26px] !border !border-[#b7d8ff] !bg-[#edf5ff] !p-5">
                  <DetailList items={company.detail.supplierNeeds} />
                </div>
              </SectionCard>
            </div>

            <aside className="!space-y-6 lg:!sticky lg:!top-[112px] lg:!self-start">
              <section className="!rounded-[32px] !border !border-[#e5edf7] !bg-white !p-7 !shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <p className="!text-[12px] !font-bold !uppercase !tracking-[0.14em] !text-[#1181e5]">
                  Resumen
                </p>

                <dl className="!mt-4">
                  <InfoRow label="Sitio web" value={company.detail.website} />
                  <InfoRow label="Categoría" value={company.categoryLabel} />
                  <InfoRow label="Tipo" value={company.tierLabel} />
                  <InfoRow label="Ubicación" value={`${company.city}, ${company.state}`} />
                </dl>
              </section>

              <section className="!rounded-[32px] !border !border-[#e5edf7] !bg-white !p-7 !shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <p className="!text-[12px] !font-bold !uppercase !tracking-[0.14em] !text-[#1181e5]">
                  Certificaciones
                </p>

                <div className="!mt-5 !flex !flex-wrap !gap-2.5">
                  {company.detail.certifications.map((certification) => (
                    <span
                      key={certification}
                      className="!rounded-full !bg-[#e5effa] !px-3.5 !py-2 !text-[13px] !font-bold !text-[#213854]"
                    >
                      {certification}
                    </span>
                  ))}
                </div>
              </section>

              <section className="!rounded-[32px] !border !border-[#e5edf7] !bg-white !p-7 !shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <p className="!text-[12px] !font-bold !uppercase !tracking-[0.14em] !text-[#1181e5]">
                  Industrias
                </p>

                <div className="!mt-5 !flex !flex-wrap !gap-2.5">
                  {company.detail.industries.map((industry) => (
                    <span
                      key={industry}
                      className="!rounded-full !bg-[#f1f5f9] !px-3.5 !py-2 !text-[13px] !font-bold !text-[#475569]"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </section>

              <section className="!rounded-[32px] !border !border-[#b7d8ff] !bg-[#edf5ff] !p-7 !shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <p className="!text-[12px] !font-bold !uppercase !tracking-[0.14em] !text-[#1181e5]">
                  Contacto
                </p>

                <div className="!mt-5 !space-y-5">
                  {company.detail.contacts.map((contact) => (
                    <div
                      key={`${contact.name}-${contact.role}`}
                      className="!rounded-[22px] !bg-white !p-5 !shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                    >
                      <p className="!text-[16px] !font-bold !leading-[1.2] !text-[#12284b]">
                        {contact.name}
                      </p>
                      <p className="!mt-1 !text-[13px] !font-semibold !text-[#64748b]">
                        {contact.role}
                      </p>
                      <p className="!mt-4 !text-[14px] !font-semibold !text-[#334155]">
                        {contact.email}
                      </p>
                      <p className="!mt-1 !text-[14px] !font-semibold !text-[#334155]">
                        {contact.phone}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
