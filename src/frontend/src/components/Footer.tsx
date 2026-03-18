export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="mt-16"
      style={{
        background: "linear-gradient(90deg, #071A2A 0%, #0B2A3D 100%)",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">Mechtools</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
          <span className="text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            © {year} All rights reserved.
          </span>
        </div>
        <div
          className="flex items-center gap-6 text-sm"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <span>Stress Calculator</span>
          <span>Strain Calculator</span>
          <span>Power Calculator</span>
        </div>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
          Built with ❤️ using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-white transition-colors"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
