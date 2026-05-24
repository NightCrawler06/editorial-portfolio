const stats = [
  ["05", "Years coding"],
  ["12", "Tools in stack"],
  ["10", "Projects"],
  ["PH", "Location"],
];

export function ContentNav() {
  return (
    <section className="section-reveal border-b border-line px-4 py-8 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-7xl border border-line sm:grid-cols-4">
        {stats.map(([value, label]) => (
          <div
            key={label}
            className="border-b border-line p-5 sm:border-b-0 sm:border-r sm:last:border-r-0"
          >
            <p className="font-display text-4xl uppercase leading-none text-muted">
              {value}
            </p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-muted">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
