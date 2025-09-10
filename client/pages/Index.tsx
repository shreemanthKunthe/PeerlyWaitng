import { useState } from "react";

export default function Index() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Purple glow like the design */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-[70vh] w-[70vw] max-w-[1200px] rounded-full opacity-80 [background:radial-gradient(90%_70%_at_20%_20%,rgba(124,58,237,0.55),rgba(49,46,129,0.45)_40%,transparent_70%)]" />

      <main className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        {/* Hero */}
        <section className="pt-16 md:pt-20 lg:pt-24">
          <h1 className="text-[44px] sm:text-[64px] md:text-[88px] lg:text-[104px] leading-[0.95] font-semibold tracking-tight">
            Introducing Peerly
          </h1>
          <p className="mt-6 max-w-3xl text-[13px] sm:text-sm md:text-[15px] text-white/80">
            Peerly connects students and professionals through peer-to-peer sessions. Share your skills, get help when you're stuck, and grow in a community that believes knowledge gets stronger when it's shared.
          </p>
          <div className="mt-6 border-t border-white/20" />
        </section>

        {/* Form */}
        <section className="mt-16 md:mt-20 lg:mt-28">
          <form onSubmit={onSubmit} className="w-full max-w-[542px]">
            <div className="space-y-10">
              <div>
                <label htmlFor="name" className="block text-[15px] font-medium mb-2">
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
                <label htmlFor="email" className="block text-[15px] font-medium mb-2">
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
              disabled={submitted}
              className="mt-10 underline text-[16px] font-medium text-white hover:text-white/80 transition-colors disabled:text-white/60"
            >
              {submitted ? "Submitted" : "Submit"}
            </button>
          </form>
        </section>

        {/* Bottom section like design */}
        <section className="mt-28 md:mt-36 lg:mt-40">
          <p className="text-white text-[18px] md:text-[20px] font-medium">Signuptojointhecommunity</p>
          <div className="mt-3 border-t border-white/20" />

          <div className="mt-6 flex items-center justify-between text-[11px] text-white/70">
            <div>© 2025 Peerly</div>
            <nav className="flex items-center gap-6">
              <a className="hover:text-white" href="#">Blog</a>
              <a className="hover:text-white" href="#">Jobs</a>
              <a className="hover:text-white" href="#">Terms of Use</a>
              <a className="hover:text-white" href="#">Privacy Policy</a>
            </nav>
          </div>
          <div className="mt-6 border-t border-white/20" />
        </section>
      </main>
    </div>
  );
}
