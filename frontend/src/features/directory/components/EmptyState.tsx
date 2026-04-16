type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="directory-empty-state" role="status" aria-live="polite">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
