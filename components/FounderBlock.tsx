const FOUNDER_EMAIL = "jacobsilver@suasqrf.org";

// Founder section for the homepage (full) and /campaign (compact).
export default function FounderBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "card founder compact" : "card founder"}>
      {/* PHOTO PLACEHOLDER: replace with public/images/founder-photo.jpg once Jacob supplies a real photo. Do not generate or fake one. */}
      <div className="founder-photo" role="img" aria-label="Founder photo coming soon">
        Photo coming soon
        <br />
        (founder-photo.jpg)
      </div>
      <div>
        {/* BIO DRAFT: needs Jacob's approval */}
        <h3>Jacob Silver, Founder &amp; CEO</h3>
        <p>
          Jacob founded S.U.A.S. Veteran Crisis QRF to get veterans in crisis help in hours, not
          days — a ride, a meal, a safe bed for the night, and a peer check-in from another
          veteran.
        </p>
        <p>
          Contact: <a href={`mailto:${FOUNDER_EMAIL}`}>{FOUNDER_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
