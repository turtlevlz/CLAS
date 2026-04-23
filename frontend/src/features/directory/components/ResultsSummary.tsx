type ResultsSummaryProps = {
  visibleCount: number;
  totalCount: number;
};

export default function ResultsSummary({
  visibleCount,
  totalCount,
}: ResultsSummaryProps) {
  return (
    <p className="text-[1.05rem] text-slate-500">
      Mostrando <span className="font-semibold text-slate-700">{visibleCount}</span>{' '}
      miembros de <span className="font-semibold text-slate-700">{totalCount}</span>{' '}
      miembros
    </p>
  );
}
