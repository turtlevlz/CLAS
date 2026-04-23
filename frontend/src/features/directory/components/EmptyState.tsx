type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <section className="rounded-[30px] border border-dashed border-slate-200 bg-white/80 px-6 py-16 text-center">
      <h2 className="text-2xl font-bold text-[#0d2340]">
        {title}
      </h2>

      <p className="mt-4 text-lg leading-8 text-slate-500">
        {description}
      </p>
    </section>
  );
}
