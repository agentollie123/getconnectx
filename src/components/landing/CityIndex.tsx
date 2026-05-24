import { Link } from "react-router-dom";

const regions: { label: string; cities: { name: string; slug: string }[] }[] = [
  {
    label: "Southeast Asia",
    cities: [
      { name: "Singapore", slug: "singapore" },
      { name: "Jakarta", slug: "jakarta" },
      { name: "Bangkok", slug: "bangkok" },
      { name: "Kuala Lumpur", slug: "kuala-lumpur" },
      { name: "Manila", slug: "manila" },
      { name: "Ho Chi Minh", slug: "ho-chi-minh" },
      { name: "Hanoi", slug: "hanoi" },
    ],
  },
  {
    label: "APAC",
    cities: [
      { name: "Tokyo", slug: "tokyo" },
      { name: "Seoul", slug: "seoul" },
      { name: "Hong Kong", slug: "hong-kong" },
      { name: "Taipei", slug: "taipei" },
      { name: "Sydney", slug: "sydney" },
    ],
  },
  {
    label: "South Asia",
    cities: [
      { name: "Bangalore", slug: "bangalore" },
      { name: "Mumbai", slug: "mumbai" },
      { name: "Delhi NCR", slug: "delhi" },
      { name: "Karachi", slug: "karachi" },
      { name: "Dhaka", slug: "dhaka" },
    ],
  },
  {
    label: "Middle East",
    cities: [
      { name: "Dubai", slug: "dubai" },
      { name: "Abu Dhabi", slug: "abu-dhabi" },
      { name: "Riyadh", slug: "riyadh" },
      { name: "Tel Aviv", slug: "tel-aviv" },
      { name: "Cairo", slug: "cairo" },
      { name: "Doha", slug: "doha" },
    ],
  },
];

export function CityIndex() {
  return (
    <section className="border-t border-border py-16" aria-labelledby="city-index-heading">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Available in 35+ cities
          </p>
          <h2
            id="city-index-heading"
            className="font-display text-2xl md:text-3xl font-semibold text-foreground"
          >
            Find a co-founder in your city.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
          {regions.map((r) => (
            <div key={r.label}>
              <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                {r.label}
              </h3>
              <ul className="space-y-1.5">
                {r.cities.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/find-a-cofounder-${c.slug}`}
                      className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      Co-founders in {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
