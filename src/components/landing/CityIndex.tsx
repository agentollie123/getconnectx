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
  // Visually hidden but crawlable: preserves internal links for SEO
  // without showing the city grid on the landing page.
  return (
    <nav aria-label="Find a co-founder by city" className="sr-only">
      <h2>Find a co-founder in your city</h2>
      {regions.map((r) => (
        <div key={r.label}>
          <h3>{r.label}</h3>
          <ul>
            {r.cities.map((c) => (
              <li key={c.slug}>
                <Link to={`/find-a-cofounder-${c.slug}`}>
                  Co-founders in {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
