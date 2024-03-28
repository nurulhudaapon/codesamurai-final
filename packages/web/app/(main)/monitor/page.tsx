import { cubeClient } from "@/client";
import { getServerAuthSession } from "@/utils/auth";
import WaveSVG from "@/assets/wave.svg";

const titles = ["Costing", "Wastage", "Oil Used", "Distance"];
const Unit = [" USD", " Tons", " L", " Km"];

const MonitorPage = async () => {
  const session = await getServerAuthSession();
  const response = await cubeClient.getTotalWaste();
  const sum = {
    costing: 5223,
    wastage: 223,
    oilUsed: 105,
    distance: 522,
  };

  return (
    <main>
      <div className={`max-w-9xl mx-auto w-full px-2 py-8 sm:px-6 lg:px-4`}>
        <div className="grid grid-cols-12 gap-4 xl:gap-6">
          {Object.keys(sum).map((key, idx) => (
            <Card
              idx={idx}
              key={key}
              title={"Total " + titles[idx]}
              value={sum[key as keyof typeof sum]}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

const Card = ({
  title,
  value,
  idx,
}: {
  title: string;
  value: number;
  idx: number;
}) => {
  return (
    <div
      className="col-span-full rounded-md border border-solid text-white p-4 shadow-sm md:col-span-6 lg:col-span-3"
      style={{
        background: "linear-gradient(90deg, #007324 0%, #00BA41 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h1 className="font-semibold text-sm">{title}</h1>
      <div className="flex items-center justify-center pt-2 pb-4">
        <div className="text-2xl font-bold">
          {value.toLocaleString("en-US") + Unit[idx]}
        </div>
      </div>
      <div className="absolute top-0 right-4 md:right-8">
        <WaveSVG />
      </div>
    </div>
  );
};

export default MonitorPage;
