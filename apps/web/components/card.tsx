import WaveSVG from "@/assets/wave.svg";

export const StatsCard = ({
  title,
  value,
}: {
  title: React.ReactNode;
  value: React.ReactNode;
}) => {
  return (
    <div
      className="col-span-full rounded-md border border-solid text-white p-4 shadow-sm md:col-span-6 lg:col-span-3 w-full"
      style={{
        background: "linear-gradient(90deg, #007324 0%, #00BA41 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h1 className="font-semibold text-sm">{title}</h1>
      <div className="flex pt-2 pb-4">
        <div className="text-2xl font-bold">{value}</div>
      </div>
      <div className="absolute top-0 right-4 md:right-8">
        <WaveSVG />
      </div>
    </div>
  );
};
