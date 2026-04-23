type ResultsSummaryProps = {
  visibleCount: number;
  totalCount: number;
};

export default function ResultsSummary({
  visibleCount,
  totalCount,
}: ResultsSummaryProps) {
  return (
    <p className="directory-results-summary">
      Mostrando <strong>{visibleCount}</strong> miembros de{' '}
      <strong>{totalCount}</strong> miembros
    </p>
  );
}
