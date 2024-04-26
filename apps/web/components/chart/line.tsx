"use client";
import React, { useRef, useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  ChartItem,
  ChartData,
  CategoryScale,
  TimeSeriesScale,
} from "chart.js";
import "chartjs-adapter-moment";
// import { _DeepPartialObject } from "chart.js/dist/types/utils";
import { Options } from "chartjs-plugin-datalabels/types/options";

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  CategoryScale,
  TimeSeriesScale
);

type LineChartProps = {
  data: ChartData<"line">;
  width: number;
  height: number;
  datalabels?: any;
};

export const LineChart01 = ({
  data,
  width,
  height,
  datalabels,
}: LineChartProps) => {
  const canvas = useRef<ChartItem>(null!);

  useEffect(() => {
    const ctx = canvas.current;
    const chart = new Chart(ctx, {
      type: "line",
      data,
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            // grid: {
            //   display: false,
            // },
            beginAtZero: true,
            ticks: {
              maxTicksLimit: 4,
            },
          },
          x: {
            type: "timeseries",
            ticks: {
              maxTicksLimit: 6,
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              // TODO: These should be passed via props
              // label: (context) => ' ' + Helpers.Number.formatToString(context.parsed.y),
              // title: (event) =>
              // 	Helpers.Time.formatToDate((event[0].raw as { z: Date }).z) +
              // 		'\n' +
              // 		Helpers.Time.formatToTime((event[0].raw as { z: Date }).z) || 'n /a',
            },
          },
          legend: {
            display: false,
          },
          //   datalabels,
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    return () => chart.destroy();
  }, [data, datalabels]);

  return (
    <canvas
      ref={canvas as React.LegacyRef<HTMLCanvasElement>}
      width={width}
      height={height}
    ></canvas>
  );
};
