export const About = () => {
  return (
    <div className="relative w-full z-10">
      <div className="h-screen w-full bg-linear-to-b from-transparent via-black/50 to-black" />

      <div className="relative z-10 min-h-screen w-full bg-black py-32">
        <div className="flex flex-col items-center min-h-screen gap-32">
          <div className="w-full flex items-center justify-between px-24">
            <p className="text-4xl md:text-6xl lg:text-7xl font-normal text-white tracking-wide uppercase">
              Partners that trust us
            </p>
            <p className="text-white text-sm font-light uppercase text-end ">
              We collaborate with <br /> visionary brands to create <br />
              extraordinary digital experiences.
            </p>
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-black to-transparent" />
        </div>
      </div>
    </div>
  );
};
