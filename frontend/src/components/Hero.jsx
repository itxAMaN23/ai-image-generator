const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-32 sm:pt-32 sm:pb-40 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-['Poppins']">
          Turn Your Words into{" "}
          <span className="text-[#8A4FFF]">Stunning Art</span>
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-300 font-['Inter'] max-w-2xl mx-auto">
          Welcome to ImagiVerse. Describe your vision, and our advanced AI will
          bring it to life in seconds. Unleash your creativity without limits.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/generate"
            className="rounded-md bg-[#8A4FFF] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#7b46e5] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#8A4FFF] transition-colors duration-300"
          >
            Start Generating Now
          </a>
        </div>

        <div className="mt-16 font-['JetBrains_Mono'] text-left max-w-xl mx-auto bg-white/5 p-4 rounded-lg border border-white/10">
          <p className="text-gray-400">// Sample Prompt:</p>
          <p className="text-white mt-1">
            <span className="text-[#8A4FFF]">&gt;</span> A majestic lion wearing
            a crown of stars, hyperrealistic, 4k, cinematic lighting...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
