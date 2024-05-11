import { cubeClient, dbApiClient, dbClient } from "@/client";
import { getServerAuthSession } from "@/utils/auth";
import WaveSVG from "@/assets/wave.svg";
import { LineChart01 } from "@/components/chart/line";
import { MyMap } from "@/components/map/Map";
import { Entity } from "@/types/prisma";

const titles = [
  "Total Cost Incurred",
  "Total Wastege Dumping",
  "Total Vehicles",
  "Total Landfills",
];
const Unit = [" ", " Tons", "", ""];

const MonitorPage = async () => {
  // const session = await getServerAuthSession();
  // const response = await cubeClient.getTotalWaste();
  // const transportation = await cubeClient.getTransportationStats();
  // const wastage = response?.transportation?.total_volume || 0;
  const transportationData = await dbClient.transportation.getAll();
  const vehicleData = await dbClient.vehicle.getAll();
  const landfillData = await dbClient.landfill.getAll();
  const { data: issuesData } = await dbApiClient.from("issue").select("*");
  const { data: sts } = await dbApiClient.from("sts").select("*");

  const mergedData = [
    ...(sts?.map((t) => ({ ...t, subtitle: "STS" })) || []),
    ...(issuesData?.map((t) => ({ ...t, subtitle: "Issue" })) || []),
    ...(landfillData?.map((t) => ({ ...t, subtitle: "Landfill" })) || []),
  ].filter((t) => t.latitude && t.longitude) || [];

  console.log(mergedData);
  
  var sum = {
    costing: 0,
    wastage: 0,
    totalVehicles: vehicleData.length,
    tatalLandFill: landfillData.length,
  };
  transportationData.forEach((item) => {
    if (!item.padding) {
      // Wastage calculation
      sum.wastage += item.volume;
      // Cost calucation
      var capacity = 0;
      if (item.vehicle.capacity == "fifteen_ton") capacity = 15;
      else if (item.vehicle.capacity == "seven_ton") capacity = 7;
      else if (item.vehicle.capacity == "five_ton") capacity = 5;
      else if (item.vehicle.capacity == "three_ton") capacity = 3;
      const unloadedCostRate = 0.5;
      const loadedCostRate = 1.2;
      var totalCost = unloadedCostRate * item.distance;
      totalCost +=
        (item.volume / capacity) *
        (loadedCostRate - unloadedCostRate) *
        item.distance;
      sum.costing += totalCost;
    }
  });

  return (
    <main>
      <div className={`max-w-9xl mx-auto w-full`}>
        <div className="mb-6">
          <h1 className="font-semibold text-lg">Monitor</h1>
        </div>
        <div className="grid grid-cols-6 gap-2 xl:gap-6">
          {Object.keys(sum).map((key, idx) => (
            <Card
              idx={idx}
              key={key}
              title={titles[idx]}
              value={sum[key as keyof typeof sum]}
            />
          ))}
        </div>

        {/* Add line chart */}
        {/* <div className="mt-8">
          <h1 className="font-semibold text-lg">Wastage Trend</h1>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div>
              <LineChart />
            </div>
          </div>
        </div> */}
        {/* ..Add Map Component.. */}

        <div className="mt-8">
          {/* <h1 className="font-semibold text-lg">Waste Dumping Locations</h1> */}
          <h1 className="font-semibold text-lg">Map View</h1>
          <div className="bg-white p-4 rounded-md shadow-sm my-4">
            <MyMap data={ mergedData as any} />
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
      <div className="flex pt-2 pb-4">
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

export const dynamic = "force-dynamic";

export default MonitorPage;
