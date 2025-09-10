import { useState } from "react";

export default function Index() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background pattern/texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/30 to-purple-800/50"></div>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h1 className="text-white font-instrument text-4xl lg:text-5xl xl:text-6xl font-medium mb-6 lg:mb-8 leading-tight">
            Introducing Peerly
          </h1>
          <p className="text-white/90 font-instrument text-base lg:text-lg max-w-lg mx-auto leading-relaxed px-4">
            Peerly connects students and professionals through peer-to-peer sessions. Share your skills, get help when you're stuck, and grow in a community that believes knowledge gets stronger when it's shared.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-12 mb-20">
          {/* Name field */}
          <div className="relative">
            <label 
              htmlFor="name" 
              className="block text-white font-instrument text-base font-medium mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border-0 border-b border-white text-white font-instrument text-base py-3 px-0 focus:outline-none focus:border-white/80 placeholder-white/50"
              placeholder=""
            />
          </div>

          {/* Email field */}
          <div className="relative">
            <label 
              htmlFor="email" 
              className="block text-white font-instrument text-base font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border-0 border-b border-white text-white font-instrument text-base py-3 px-0 focus:outline-none focus:border-white/80 placeholder-white/50"
              placeholder=""
            />
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitted}
              className="text-white font-instrument text-base font-medium underline hover:text-white/80 transition-colors duration-200 disabled:text-white/60"
            >
              {isSubmitted ? "Submitted!" : "Submit"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/80 font-instrument text-sm font-medium tracking-wide">
            Signuptojointhecommunity
          </p>
          <div className="mt-8 text-white/60 font-instrument text-xs">
            © 2025 Peerly
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-400/10 rounded-full blur-xl"></div>
    </div>
  );
}
