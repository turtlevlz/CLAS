import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import type { DirectoryCompany } from '../features/directory/types/directory';
import { mapPublicCompanyApi } from '../features/directory/utils/mapPublicCompanyApi';
import { useAuth } from '../context/AuthContext';
import {
  getPrivateCompanyById,
  getPublicCompanyById,
} from '../features/directory/api/directoryApi';
import { api } from '../api/http';

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
          className="!min-w-0 !break-words !rounded-[18px] !border !border-[#e5edf7] !bg-white !px-4 !py-3 !text-[14px] !font-semibold !leading-[1.35] !text-[#334155] !shadow-[0_10px_28px_rgba(15,23,42,0.04)] [overflow-wrap:anywhere]"
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

function hasValue(value: string) {
  return value.trim().length > 0;
}

function formatBoolean(value: boolean | null) {
  if (value === null) {
    return '';
  }

  return value ? 'Sí' : 'No';
}

function hasItems(items: string[]) {
  return items.length > 0;
}

function hasContacts(contacts: DirectoryCompany['detail']['contacts']) {
  return contacts.length > 0;
}

export default function EmpresaDetalle() {
  const { id } = useParams();
  const { usuarioActual } = useAuth();
  const companyId = Number(id);
  const [company, setCompany] = useState<DirectoryCompany | undefined>();
  const [isLoadingCompany, setIsLoadingCompany] = useState(true);
  const [companyError, setCompanyError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadCompany() {
      if (!Number.isInteger(companyId) || companyId <= 0) {
        setCompany(undefined);
        setCompanyError('ID de empresa inválido.');
        setIsLoadingCompany(false);
        return;
      }

      try {
        setIsLoadingCompany(true);
        setCompanyError('');

        const apiCompany = usuarioActual
          ? await getPrivateCompanyById(companyId)
          : await getPublicCompanyById(companyId);

        const mappedCompany = mapPublicCompanyApi(apiCompany);

        if (usuarioActual) {
          const [
            productosRes,
            procesosRes,
            industriasRes,
            necesidadesRes,
          ] = await Promise.all([
            api.get(`/productos/empresa/${companyId}`),
            api.get(`/empresa-procesos/empresa/${companyId}`),
            api.get(`/empresa-industrias/empresa/${companyId}`),
            api.get(`/empresa-necesidades/empresa/${companyId}`),
          ]);

          mappedCompany.detail.productsAndServices = productosRes.data.map((product: any) =>
            product.clientes
              ? `${product.nombre_producto} - Clientes: ${product.clientes}`
              : product.nombre_producto
          );

          mappedCompany.detail.manufacturingCapabilities =
            procesosRes.data.data.procesos?.map((proceso: any) => proceso.nombre_proceso) ?? [];

          mappedCompany.detail.industries =
            industriasRes.data.data.industrias?.map((industria: any) => industria.nombre_industria) ?? [];

          mappedCompany.detail.supplierNeeds =
            necesidadesRes.data.data.necesidades?.map((necesidad: any) => necesidad.nombre_necesidad) ?? [];
        }


        if (!isMounted) {
          return;
        }

        setCompany(mappedCompany);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setCompany(undefined);
        setCompanyError('No se pudo cargar la empresa. Intenta de nuevo más tarde.');
      } finally {
        if (isMounted) {
          setIsLoadingCompany(false);
        }
      }
    }

    loadCompany();

    return () => {
      isMounted = false;
    };
  }, [companyId, usuarioActual]);


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
                {isLoadingCompany ? 'Cargando' : 'Sin resultados'}
              </p>

              <h1 className="!mt-4 !text-[48px] !font-bold !leading-none !tracking-[-0.05em] !text-[#12284b]">
                {isLoadingCompany ? 'Cargando empresa' : 'Empresa no encontrada'}
              </h1>

              <p className="!mt-5 !max-w-[620px] !text-[18px] !leading-[1.7] !text-[#64748b]">
                {companyError || 'Regresa al directorio para seleccionar otro miembro disponible.'}
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

          {isLoadingCompany ? (
            <p className="!mt-4 !text-[15px] !font-semibold !text-[#64748b]">
              Cargando empresa...
            </p>
          ) : null}

          {companyError ? (
            <p className="!mt-4 !rounded-[16px] !border !border-[#fde68a] !bg-[#fffbeb] !px-4 !py-3 !text-[14px] !font-semibold !text-[#92400e]">
              {companyError}
            </p>
          ) : null}

          <header className="!mt-8 !rounded-[42px] !border !border-[#e5edf7] !bg-white/90 !p-8 !shadow-[0_28px_90px_rgba(15,23,42,0.09)] lg:!p-10">
            <div className="!flex !flex-wrap !items-start !justify-between !gap-3">
              <div className="!inline-flex !max-w-full !rounded-full !bg-[#e5effa] !px-4 !py-2 !text-[12px] !font-bold !uppercase !tracking-[0.12em] !text-[#213854]">
                <span className="!line-clamp-2 !leading-[1.35]">
                  {company.categoryLabel}
                </span>
              </div>

              <div className="!inline-flex !rounded-full !bg-[#e5effa] !px-4 !py-2 !text-[12px] !font-bold !uppercase !tracking-[0.08em] !text-[#213854]">
                {company.tierLabel}
              </div>
            </div>

            <div className="!mt-10 !grid !gap-8 lg:!grid-cols-[minmax(0,1fr)_320px] lg:!items-center">
              <div className="!min-w-0">
                <h1 className="!max-w-[760px] !break-words !text-[clamp(42px,5vw,72px)] !font-bold !leading-[0.96] !tracking-[-0.04em] !text-[#12284b] [overflow-wrap:anywhere]">
                  {displayName}
                </h1>

                <p className="!mt-6 !max-w-[780px] !break-words !text-[20px] !leading-[1.65] !text-[#64748b] [overflow-wrap:anywhere]">
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
                  {hasValue(company.detail.legalName) ? (
                    <div className="!rounded-[22px] !bg-[#f5f9ff] !p-5">
                      <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
                        Razón social
                      </dt>
                      <dd className="!mt-2 !break-words !text-[15px] !font-semibold !leading-[1.55] !text-[#334155]">
                        {company.detail.legalName}
                      </dd>
                    </div>
                  ) : null}

                  {hasValue(company.detail.rfc) ? (
                    <div className="!rounded-[22px] !bg-[#f5f9ff] !p-5">
                      <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
                        RFC
                      </dt>
                      <dd className="!mt-2 !break-words !text-[15px] !font-semibold !leading-[1.55] !text-[#334155]">
                        {company.detail.rfc}
                      </dd>
                    </div>
                  ) : null}

                  {hasValue(company.detail.address) ? (
                    <div className="!rounded-[22px] !bg-[#f5f9ff] !p-5">
                      <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
                        Dirección
                      </dt>
                      <dd className="!mt-2 !break-words !text-[15px] !font-semibold !leading-[1.55] !text-[#334155]">
                        {company.detail.address}
                      </dd>
                    </div>
                  ) : null}

                  {hasValue(company.detail.businessLine) ? (
                    <div className="!rounded-[22px] !bg-[#f5f9ff] !p-5">
                      <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
                        Giro
                      </dt>
                      <dd className="!mt-2 !break-words !text-[15px] !font-semibold !leading-[1.55] !text-[#334155]">
                        {company.detail.businessLine}
                      </dd>
                    </div>
                  ) : null}

                  {hasValue(company.detail.foundedYear) ? (
                    <div className="!rounded-[22px] !bg-[#f5f9ff] !p-5">
                      <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
                        Fundación
                      </dt>
                      <dd className="!mt-2 !break-words !text-[15px] !font-semibold !leading-[1.55] !text-[#334155]">
                        {company.detail.foundedYear}
                      </dd>
                    </div>
                  ) : null}

                  {hasValue(company.employeeRange) ? (
                    <div className="!rounded-[22px] !bg-[#f5f9ff] !p-5">
                      <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
                        Empleados
                      </dt>
                      <dd className="!mt-2 !break-words !text-[15px] !font-semibold !leading-[1.55] !text-[#334155]">
                        {company.employeeRange}
                      </dd>
                    </div>
                  ) : null}

                  {company.detail.manufacturesForAutomotive !== null ? (
                    <div className="!rounded-[22px] !bg-[#f5f9ff] !p-5">
                      <dt className="!text-[11px] !font-bold !uppercase !tracking-[0.13em] !text-[#94a3b8]">
                        Fabrica para automotriz
                      </dt>
                      <dd className="!mt-2 !break-words !text-[15px] !font-semibold !leading-[1.55] !text-[#334155]">
                        {formatBoolean(company.detail.manufacturesForAutomotive)}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </SectionCard>

              {hasItems(company.detail.certifications) ? (
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
              ) : null}

              {hasItems(company.detail.productsAndServices) ? (
                <SectionCard eyebrow="Oferta" title="Productos y servicios">
                  <DetailList items={company.detail.productsAndServices} />
                </SectionCard>
              ) : null}

              {hasItems(company.detail.manufacturingCapabilities) ? (
                <SectionCard eyebrow="Operación" title="Capacidades de manufactura">
                  <DetailList items={company.detail.manufacturingCapabilities} />
                </SectionCard>
              ) : null}

              {hasItems(company.detail.supplierNeeds) ? (
                <SectionCard eyebrow="Proveeduría" title="Necesidades actuales">
                  <div className="!rounded-[26px] !border !border-[#b7d8ff] !bg-[#edf5ff] !p-5">
                    <DetailList items={company.detail.supplierNeeds} />
                  </div>
                </SectionCard>
              ) : null}
            </div>

            <aside className="!space-y-6 lg:!sticky lg:!top-[112px] lg:!self-start">
              <section className="!rounded-[32px] !border !border-[#e5edf7] !bg-white !p-7 !shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                <p className="!text-[12px] !font-bold !uppercase !tracking-[0.14em] !text-[#1181e5]">
                  Resumen
                </p>

                <dl className="!mt-4">
                  {hasValue(company.detail.website) ? (
                    <InfoRow label="Sitio web" value={company.detail.website} />
                  ) : null}

                  {hasValue(company.detail.email) ? (
                    <InfoRow label="Correo" value={company.detail.email} />
                  ) : null}

                  {hasValue(company.detail.phone) ? (
                    <InfoRow label="Teléfono" value={company.detail.phone} />
                  ) : null}

                  {hasValue(company.detail.membership) ? (
                    <InfoRow label="Membresía" value={company.detail.membership} />
                  ) : null}

                  <InfoRow label="Tipo" value={company.tierLabel} />
                  <InfoRow label="Ubicación" value={`${company.city}, ${company.state}`} />
                </dl>

              </section>

              {hasItems(company.detail.industries) ? (
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
              ) : null}

              {hasContacts(company.detail.contacts) ? (
                <section className="!min-w-0 !rounded-[32px] !border !border-[#b7d8ff] !bg-[#edf5ff] !p-7 !shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
                  <p className="!text-[12px] !font-bold !uppercase !tracking-[0.14em] !text-[#1181e5]">
                    Contacto
                  </p>

                  <div className="!mt-5 !min-w-0 !space-y-5">
                    {company.detail.contacts.map((contact) => (
                      <div
                        key={`${contact.name}-${contact.role}`}
                        className="!min-w-0 !overflow-hidden !rounded-[22px] !bg-white !p-5 !shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                      >
                        <p className="!break-words !text-[16px] !font-bold !leading-[1.2] !text-[#12284b] [overflow-wrap:anywhere]">
                          {contact.name}
                        </p>
                        <p className="!mt-1 !break-words !text-[13px] !font-semibold !text-[#64748b] [overflow-wrap:anywhere]">
                          {contact.role}
                        </p>
                        <p className="!mt-4 !break-words !text-[14px] !font-semibold !leading-[1.45] !text-[#334155] [overflow-wrap:anywhere]">
                          {contact.email}
                        </p>
                        <p className="!mt-1 !break-words !text-[14px] !font-semibold !leading-[1.45] !text-[#334155] [overflow-wrap:anywhere]">
                          {contact.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
