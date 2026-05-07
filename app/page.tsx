import type { Metadata } from "next";
import Link from "next/link";
import { programs } from "@/lib/data";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "KPF Academy — Kinetic Pro Fitness Academy | Mumbai",
  description:
    "India's premier fitness education academy. Science-backed programs in fat loss, nutrition, strength & fitness certification by Shraddha Gadit. 17+ years · 1000+ transformations.",
  alternates: { canonical: "https://www.kineticprofitness.com" },
  openGraph: {
    url: "https://www.kineticprofitness.com",
    title: "KPF Academy — Kinetic Pro Fitness Academy | Mumbai",
    description:
      "Science-backed fitness & nutrition programs. 17+ years experience. 1000+ lives transformed. Mumbai, India.",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KPF Academy",
  url: "https://www.kineticprofitness.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.kineticprofitness.com/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* HERO */}
      <section className={styles.hero} aria-label="Hero — KPF Academy">
        <div className={styles.heroBg} />
        <div className={styles.heroGrid} />
        <div className={styles.heroGlow} />
        <div className={styles.heroContent}>
          <p className={`${styles.heroTag} anim-1`}>Mumbai · 17 Years of Excellence</p>
          <h1 className={`${styles.heroHeadline} anim-2`}>
            KINETIC PRO<br />
            <span className={styles.heroNeon}>FITNESS</span><br />
            ACADEMY
          </h1>
          <p className={`${styles.heroSub} anim-3`}>
            Excellence in Fitness Education. Transforming how India learns nutrition, fitness and wellness — through science, not trends.
          </p>
          <div className={`${styles.heroActions} anim-4`}>
            <Link href="/programs" className="btn-gold">Explore Programs</Link>
            <Link href="/coach" className="btn-outline">Meet Shraddha →</Link>
          </div>
          <p className={`${styles.heroMotto} anim-5`}>Nutrition · Fitness · Wellness · Science &gt; Trends</p>
        </div>
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeNum}>17+</span>
          <span className={styles.heroBadgeLabel}>Years Experience</span>
        </div>
      </section>

      {/* MARQUEE */}
      <div className={styles.marqueeBar} aria-hidden="true">
        <div className={styles.marqueeInner}>
          {["STRENGTH", "NUTRITION", "FAT LOSS", "WELLNESS", "MINDSET", "SCIENCE > TRENDS", "MUMBAI", "KPF ACADEMY", "STRENGTH", "NUTRITION", "FAT LOSS", "WELLNESS", "MINDSET", "SCIENCE > TRENDS", "MUMBAI", "KPF ACADEMY"].map((item, i) => (
            <span key={i} className={styles.marqueeItem}>{item} <span className={styles.marqueeDot}>✦</span></span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section className={styles.statsBar} aria-label="KPF Academy stats">
        {[["17+", "Years Experience"], ["1000+", "Lives Transformed"], ["6", "Program Types"], ["100%", "Science Backed"]].map(([v, l]) => (
          <div key={l} className={styles.stat}>
            <span className={styles.statNum}>{v}</span>
            <span className={styles.statLabel}>{l}</span>
          </div>
        ))}
      </section>

      {/* PROGRAMS PREVIEW — same card style as /programs page */}
      <section className={styles.section} aria-labelledby="programs-heading">
        <div className={styles.sectionHeader}>
          <div>
            <span className="section-label">What we offer</span>
            <h2 id="programs-heading" className={styles.sectionTitle}>OUR PROGRAMS</h2>
          </div>
          <Link href="/programs" className="btn-outline">View All →</Link>
        </div>

        <div className={styles.programsGrid}>
          {programs
            .filter((p) =>
              p.slug === "fitness-trainer-certification" ||
              p.slug === "nutrition-mastery"
            )
            .map((p) => (
              <Link
                href={`/programs/${p.slug}`}
                key={p.slug}
                className={styles.programCard}
                aria-label={`${p.title} — ${p.duration} · ₹${p.price.toLocaleString()}`}
              >
                {/* IMAGE AREA — matches /programs card */}
                <div className={styles.cardImageWrap}>
                  <div
                    className={styles.cardImageFallback}
                    style={{ background: `linear-gradient(135deg, ${p.color}22 0%, ${p.color}11 100%)` }}
                  >
                    <span className={styles.cardImageIcon} aria-hidden="true">{p.icon}</span>
                  </div>
                  <div
                    className={styles.cardImageOverlay}
                    style={{ background: `linear-gradient(to bottom, transparent 50%, var(--card) 100%)` }}
                  />
                  <span
                    className={styles.tagOverlay}
                    style={{ borderColor: `${p.color}55`, color: p.color }}
                  >
                    {p.tag}
                  </span>
                </div>

                {/* CARD BODY */}
                <div className={styles.cardBody}>
                  <div className={styles.cardBorderAccent} style={{ background: p.color }} />
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardSub}>{p.subtitle}</p>
                  <p className={styles.cardDesc}>{p.description.slice(0, 130)}...</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.metaItem}>⏱ {p.duration}</span>
                    <span className={styles.metaItem}>📊 {p.level}</span>
                  </div>
                  <div className={styles.cardFooter}>
                    <div>
                      <span className={styles.price}>₹{p.price.toLocaleString()}</span>
                      <span className={styles.originalPrice}>₹{p.originalPrice.toLocaleString()}</span>
                    </div>
                    <span className={styles.cardCta} style={{ color: p.color }}>View Program →</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section className={styles.aboutStrip} aria-labelledby="about-heading">
        <div>
          <h2 id="about-heading" className={styles.aboutTitle}>NOT JUST FITNESS.<br /><span className={styles.neon}>EDUCATION.</span></h2>
        </div>
        <div>
          <span className="section-label">Our philosophy</span>
          <p className={styles.aboutText}>KPF Academy was founded by <strong>Shraddha Gadit</strong> with a single mission — to transform how India learns nutrition and fitness. With over <strong>17 years of experience</strong>, every program is built on evidence, not trends.</p>
          <Link href="/coach" className="btn-gold">Meet Shraddha →</Link>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className={styles.testimonialSection} aria-label="Client testimonial">
        <figure className={styles.testimonialCard}>
          <blockquote className={styles.testimonialQuote}>
            &ldquo;KPF Academy didn&apos;t just give me a program — they gave me the knowledge to transform my life. Shraddha&apos;s approach is unlike anything else in India.&rdquo;
          </blockquote>
          <figcaption className={styles.testimonialAuthor}>Priya Sharma · Mumbai · Fat Loss Transformation</figcaption>
        </figure>
        <Link href="/results" className="btn-outline" style={{ marginTop: "3rem", display: "inline-block" }}>See All Results →</Link>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection} aria-labelledby="cta-heading">
        <div className={styles.ctaWatermark} aria-hidden="true">KPF</div>
        <span className="section-label" style={{ textAlign: "center", display: "block" }}>Start today</span>
        <h2 id="cta-heading" className={styles.ctaTitle}>READY TO TRANSFORM?</h2>
        <p className={styles.ctaSub}>Join 1000+ people who&apos;ve transformed their bodies and minds with KPF Academy.</p>
        <div className={styles.ctaActions}>
          <Link href="/pricing" className="btn-gold">View Pricing</Link>
          <Link href="/programs" className="btn-outline">Browse Programs</Link>
        </div>
      </section>
    </>
  );
}
