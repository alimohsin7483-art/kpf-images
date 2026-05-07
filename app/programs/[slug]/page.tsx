// ─── SEO CHANGE: Added generateMetadata for dynamic program pages ─────────────
import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "@/lib/data";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

const SITE_URL = "https://www.kineticprofitness.com";

// ─── Dynamic metadata per program ─────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const program = programs.find((p) => p.slug === params.slug);
  if (!program) return {};

  const url = `${SITE_URL}/programs/${program.slug}`;
  return {
    title: program.title,
    description: `${program.subtitle}. ${program.description.slice(0, 120)} — by Shraddha Gadit, KPF Academy Mumbai.`,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: `${program.title} | KPF Academy`,
      description: `${program.subtitle}. ₹${program.price.toLocaleString()} · ${program.duration} · ${program.level}`,
    },
  };
}

export async function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export default function ProgramDetail({
  params,
}: {
  params: { slug: string };
}) {
  const program = programs.find((p) => p.slug === params.slug);
  if (!program) notFound();

  // ─── JSON-LD: Course schema per program ─────────────────────────────────────
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: program.description,
    url: `${SITE_URL}/programs/${program.slug}`,
    image: `${SITE_URL}${program.image}`,
    provider: {
      "@type": "Organization",
      name: "KPF Academy",
      url: SITE_URL,
    },
    instructor: {
      "@type": "Person",
      name: "Shraddha Gadit",
      url: `${SITE_URL}/coach`,
    },
    offers: {
      "@type": "Offer",
      price: program.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/enroll/${program.slug}`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      duration: program.duration,
    },
    review: {
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      author: { "@type": "Person", name: program.testimonial.name },
      reviewBody: program.testimonial.quote,
    },
  };

  return (
    <>
      {/* ─── JSON-LD: Course schema ──────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* HERO */}
      <header className="page-hero">
        <div className="page-hero-grid" />
        <div className={styles.heroInner}>
          {/* ─── SEO: Breadcrumb internal link ───────────────────────── */}
          <nav aria-label="Breadcrumb">
            <Link href="/programs" className={styles.back}>← All Programs</Link>
          </nav>
          <div className={styles.heroTop}>
            <span className={styles.icon} aria-hidden="true">{program.icon}</span>
            <span className={styles.tag} style={{ borderColor: `${program.color}55`, color: program.color }}>{program.tag}</span>
          </div>
          {/* ─── SEO: H1 — program name ──────────────────────────────── */}
          <h1 className={styles.heroTitle}>{program.title}</h1>
          <p className={styles.heroSub}>{program.subtitle}</p>
          <div className={styles.heroMeta}>
            <span>⏱ {program.duration}</span>
            <span>📊 {program.level}</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className={styles.body}>
        <div className={styles.left}>
          {/* About */}
          <section className={styles.block} aria-labelledby="about-heading">
            <h2 id="about-heading" className={styles.blockTitle}>ABOUT THIS PROGRAM</h2>
            <p className={styles.bodyText}>{program.description}</p>
          </section>

          {/* Curriculum */}
          <section className={styles.block} aria-labelledby="curriculum-heading">
            <h2 id="curriculum-heading" className={styles.blockTitle}>CURRICULUM</h2>
            <div className={styles.curriculum}>
              {program.curriculum.map((c, i) => (
                <div key={i} className={styles.week}>
                  <div className={styles.weekNum}>{c.week}</div>
                  <div>
                    <h3 className={styles.weekTitle}>{c.title}</h3>
                    <p className={styles.weekDesc}>{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Testimonial */}
          <figure className={styles.testimonialBlock}>
            <blockquote className={styles.testimonialQuote}>
              &ldquo;{program.testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className={styles.testimonialAttr}>
              <span className={styles.testimonialName}>{program.testimonial.name}</span>
              <span className={styles.testimonialResult} style={{ color: program.color }}>{program.testimonial.result}</span>
            </figcaption>
          </figure>
        </div>

        {/* SIDEBAR */}
        <aside className={styles.sidebar} aria-label="Enrollment details">
          <div className={styles.enrollCard}>
            <div className={styles.enrollPrice}>
              <span className={styles.price}>₹{program.price.toLocaleString()}</span>
              <span className={styles.originalPrice}>₹{program.originalPrice.toLocaleString()}</span>
              <span className={styles.savings}>Save ₹{(program.originalPrice - program.price).toLocaleString()}</span>
            </div>

            <ul className={styles.highlights} aria-label="Program highlights">
              {program.highlights.map((h) => (
                <li key={h} className={styles.highlight}>
                  <span className={styles.check} aria-hidden="true">✓</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <Link
              href={`/enroll/${program.slug}`}
              className="btn-gold"
              style={{ width: "100%", textAlign: "center", display: "block", marginBottom: "1rem" }}
            >
              Enroll Now →
            </Link>
            <Link
              href={`/enroll/${program.slug}?free=true`}
              className="btn-outline"
              style={{ width: "100%", textAlign: "center", display: "block" }}
            >
              Book Free Consultation
            </Link>

            <p className={styles.enrollNote}>✓ Secure payment · ✓ Instant access · ✓ 7-day refund</p>
          </div>

          <div className={styles.coachCard}>
            <span className={styles.coachLabel}>Your Coach</span>
            <div className={styles.coachName}>Shraddha Gadit</div>
            <p className={styles.coachBio}>17+ years experience · Mumbai · Fitness Educator</p>
            {/* ─── SEO: Internal link to coach page ───────────────────── */}
            <Link href="/coach" className={styles.coachLink}>View full profile →</Link>
          </div>
        </aside>
      </div>

      {/* OTHER PROGRAMS */}
      <section className={styles.otherSection} aria-labelledby="other-programs-heading">
        <h2 id="other-programs-heading" className={styles.otherTitle}>EXPLORE OTHER PROGRAMS</h2>
        <div className={styles.otherGrid}>
          {programs
            .filter((p) => p.slug !== program.slug)
            .map((p) => (
              <Link href={`/programs/${p.slug}`} key={p.slug} className={styles.otherCard}>
                <span className={styles.otherIcon} aria-hidden="true">{p.icon}</span>
                <h3 className={styles.otherCardTitle}>{p.title}</h3>
                <span className={styles.otherPrice}>₹{p.price.toLocaleString()}</span>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
