import { cubeClient } from "@/client";
import { getServerAuthSession } from "@/utils/auth";
import WaveSVG from "@/assets/wave.svg";
import { LineChart01 } from "@/components/chart/line";

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
      <div className={`max-w-9xl mx-auto w-full px-2 py-4 sm:px-6 lg:px-4`}>
        <div className="mb-6">
          <h1 className="font-semibold text-lg">Monitor</h1>
        </div>
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

        {/* Add line chart */}
        <div className="mt-8">
          <h1 className="font-semibold text-lg">Wastage Trend</h1>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div>
              <LineChart />
            </div>
          </div>
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

type ChartPropsData = React.ComponentProps<typeof LineChart01>["data"];
const baseDataSet: Partial<ChartPropsData["datasets"][number]> = {
  borderWidth: 2,
  pointRadius: 5,
  pointHoverRadius: 3,
  clip: 20,
};

const LineChart = () => {
  const currentData = [30, 10, 70, 50, 20, 40, 60];
  const prevData = [20, 30, 40, 50, 60, 70, 80]; //{x: index, y: value, z: date}

  const data: ChartPropsData = {
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        data: currentData,
        fill: false,
        backgroundColor: `rgba(59, 130, 246, 0.08)`,
        borderColor: "#6366f1",
        pointBackgroundColor: "#6366f1",
        tension: 0.3,
        ...baseDataSet,
      },
      {
        data: prevData,
        fill: false,
        backgroundColor: `rgba(203, 213, 224, 0.08)`,
        borderColor: "#ea4a15",
        pointBackgroundColor: "#da0e85",
        tension: 0.3,
        ...baseDataSet,
      },
    ],
  };
  return (
    <div className="grow">
      <LineChart01 data={data} width={360} height={450} />
    </div>
  );
};

export default MonitorPage;
