import { useState, useEffect } from "react";
import { assertGoogleScriptUrl } from "../lib/config";

export default function Index() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);

  const normalizeEmail = (v: string) => (v || "").trim().toLowerCase();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  // On mount, check if user has already joined (same browser)
  useEffect(() => {
    const storedEmail = localStorage.getItem("waitlisted_email");
    if (storedEmail) {
      setHasJoined(true);
      setFormData((p) => ({ ...p, email: storedEmail }));
      setMessage("✅ You’re already on the waiting list with this email.");
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setSubmitting(true);

    try {
      const url = assertGoogleScriptUrl();
      if (!url) throw new Error("Missing VITE_GOOGLE_SCRIPT_URL or VITE_GAS_URL env var.");

      const normalized = normalizeEmail(formData.email);
      const localKey = `waitlisted:${normalized}`;

      // Prevent duplicate submission from the same browser
      if (localStorage.getItem(localKey)) {
        setMessage("✅ You’re already on the waiting list with this email.");
        setHasJoined(true);
        return;
      }

      const params = new URLSearchParams();
      params.append("email", normalized);
      if (formData.name) params.append("name", formData.name.trim());
      params.append("timestamp", new Date().toISOString());

      const res = await fetch(url, {
        method: "POST",
        body: params,
      });

      const data = await res.json();
      if (data.result === "success" || data.result === "exists" || data.result === "duplicate") {
        if (data.result === "success") {
          setMessage("✅ You’ve been added to the waiting list!");
        } else {
          setMessage("✅ You’re already on the waiting list with this email.");
        }
        // Mark as waitlisted locally to prevent re-submissions
        localStorage.setItem(localKey, "1");
        localStorage.setItem("waitlisted_email", normalized);
        setHasJoined(true);
        setFormData((p) => ({ ...p, email: normalized }));
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err: any) {
      setMessage(`❌ Error: ${err?.message || "Submission failed"}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Purple glow like the design */}
      <div className="pointer-events-none absolute -top-56 -left-56 h-[90vh] w-[90vw] max-w-[1400px] rounded-full opacity-90 [background:radial-gradient(80%_70%_at_25%_20%,rgba(124,58,237,0.6),rgba(79,70,229,0.35)_45%,transparent_70%)] animate-float-slow will-change-transform" />
      <main className="relative z-10 max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-16">
        {/* Hero */}
        <section className="pt-14 sm:pt-16 md:pt-20 lg:pt-24">
          <h1 className="text-[48px] sm:text-[72px] md:text-[104px] lg:text-[120px] xl:text-[128px] leading-[0.88] font-semibold tracking-tight">
            Introducing Peerly
          </h1>
          <p className="mt-5 max-w-[56rem] text-[13px] sm:text-sm md:text-[15px] text-white/85">
            Peerly connects students and professionals through peer-to-peer
            sessions. Share your skills, get help when you're stuck, and grow in
            a community that believes knowledge gets stronger when it's shared.
          </p>
          {/* full-width rule */}
          <div
            aria-hidden
            className="mt-6 h-px bg-white/20 w-screen relative left-1/2 -ml-[50vw]"
          />
        </section>

        {/* Form */}
        <section className="mt-16 md:mt-20 lg:mt-24">
          {!hasJoined && (
          <form onSubmit={onSubmit} className="w-full max-w-[542px]">
            <div className="space-y-10">
              <div>
                <label
                  htmlFor="name"
                  className="block text-[15px] font-medium mb-2"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  required
                  className="w-full bg-transparent border-0 border-b border-white outline-none focus:border-white/80 text-[15px] py-3 placeholder-white/50"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[15px] font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  required
                  className="w-full bg-transparent border-0 border-b border-white outline-none focus:border-white/80 text-[15px] py-3 placeholder-white/50"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-10 underline text-[16px] font-medium text-white hover:text-white/80 transition-colors disabled:text-white/60"
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </form>
          )}
          {/* Message */}
          {message && !hasJoined && (
            <div id="message" className={`mt-4 text-sm ${message.startsWith("✅") ? "text-green-400" : "text-red-400"}`}>
              {message}
            </div>
          )}
          {hasJoined && (
            <div id="message" className="mt-6 text-center text-white font-semibold text-xl">
              {message || "✅ You’re already on the waiting list with this email."}
            </div>
          )}
        </section>

        {/* Bottom section like design */}
        <section className="mt-28 md:mt-36 lg:mt-40">
          <p className="text-white text-[18px] md:text-[20px] font-medium">
            Signuptojointhecommunity
          </p>
          <div className="mt-3 h-px bg-white/20 w-screen relative left-1/2 -ml-[50vw]" />

          <div className="mt-6 flex items-center justify-between text-[11px] text-white/70">
            <div>© 2025 Peerly</div>
            <nav className="flex items-center gap-6">
              <a className="hover:text-white" href="#">
                Blog
              </a>
              <a className="hover:text-white" href="#">
                Jobs
              </a>
              <a className="hover:text-white" href="#">
                Terms of Use
              </a>
              <a className="hover:text-white" href="#">
                Privacy Policy
              </a>
            </nav>
          </div>
          <div className="mt-6 h-px bg-white/20 w-screen relative left-1/2 -ml-[50vw]" />
        </section>
      </main>
    </div>
  );
}
