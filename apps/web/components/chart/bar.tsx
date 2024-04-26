import React, { useRef, useEffect } from "react";
import {
  Chart,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  ChartItem,
  ChartData,
  BarElement,
  CategoryScale,
  BarController,
  Legend,
} from "chart.js";
// import { Helpers } from '@homepay/utils-helper';

Chart.register(
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  CategoryScale,
  BarController,
  BarElement,
  LinearScale,
  Legend
);

type LineChartProps = {
  data: ChartData<"line">;
  width: number;
  height: number;
};

export const BarChart = ({ data, width, height }: LineChartProps) => {
  const canvas = useRef<ChartItem>(null!);
  const legend = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = canvas.current;
    const chart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        layout: {
          padding: {
            top: 12,
            bottom: 16,
            left: 20,
            right: 20,
          },
        },
        scales: {
          y: {
            grid: {
              display: false,
            },
            ticks: {
              // callback: (value) => Helpers.Number.abbreviateNumber(value as number, 2),
            },
          },
          x: {
            type: "time",
            time: {
              parser: "YYYY-MM-DD",
              unit: "month",
              displayFormats: {
                month: "MM",
              },
            },
            ticks: {
              maxTicksLimit: 5,
              align: "end",
              callback: (value) => {
                // Unix timestamp to YYYY-MM-DD
                if (typeof value === "string") return value;
                const date = new Date(value);

                const month = new Date(date).toLocaleString("default", {
                  month: "short",
                });
                const year = new Date(date).getFullYear();
                return `${month} ${year}`;
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              // title: () => false, // Disable tooltip title
              // label: (context) => context.parsed.x,
            },
          },
          datalabels: {
            color: "rgb(59, 71, 88)",
            font: {
              weight: "bolder",
            },
            // formatter: (value, ctx) => {
            //   return Helpers.Number.abbreviateNumber(value, 1);
            // },
            rotation: 270,
            align: "top",
            textAlign: "start",
            anchor: "end",
          },
        } as any,
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: {
          duration: 500,
        },
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
      plugins: [
        {
          id: "htmlLegend",
          afterUpdate(c, args, options) {
            const ul = legend?.current;
            if (!ul) return;
            // Remove old legend items
            while (ul.firstChild) {
              ul.firstChild.remove();
            }
            // Reuse the built-in legendItems generator
            const items =
              c?.options?.plugins?.legend?.labels?.generateLabels?.(c) ?? [];
            items.forEach((item) => {
              const li = document.createElement("li");
              li.style.marginRight = "16px";
              // Button element

              const button = document.createElement("button");
              button.style.display = "inline-flex";
              button.style.alignItems = "center";
              button.style.opacity = item?.hidden ? ".3" : "";
              button.onclick = () => {
                if (c && item && item.datasetIndex !== undefined) {
                  c.setDatasetVisibility(
                    item.datasetIndex,
                    !c.isDatasetVisible(item.datasetIndex)
                  );
                  c.update();
                }
              };
              // Color box
              const box = document.createElement("span");
              box.style.display = "block";
              box.style.width = tailwindConfig().theme.width[3];
              box.style.height = tailwindConfig().theme.height[3];
              box.style.borderRadius = tailwindConfig().theme.borderRadius.full;
              box.style.marginRight = tailwindConfig().theme.margin[2];
              box.style.borderWidth = "3px";
              box.style.borderColor = item.fillStyle
                ? item.fillStyle.toString()
                : "#e5e7eb";
              box.style.pointerEvents = "none";
              // Label
              const label = document.createElement("span");
              label.style.color = tailwindConfig().theme.colors?.slate?.["500"];
              // label.style.fontSize = tailwindConfig().theme.fontSize?.sm?.[0];
              // label.style.lineHeight = tailwindConfig().theme.fontSize.sm[1].lineHeight;
              const labelText = document.createTextNode(item.text);
              label.appendChild(labelText);
              li.appendChild(button);
              button.appendChild(box);
              button.appendChild(label);
              ul.appendChild(li);
            });
          },
        },
      ],
    });
    return () => chart.destroy();
  }, [data]);

  return (
    <>
      <div className="px-5 py-4">
        <ul ref={legend} className="flex flex-wrap"></ul>
      </div>
      <div className="grow">
        <canvas
          ref={canvas as React.LegacyRef<HTMLCanvasElement>}
          width={width}
          height={height}
        ></canvas>
      </div>
    </>
  );
};

export const tailwindConfig = () => ({
  theme: {
    width: {
      3: "0.75rem",
      4: "1rem",
    },
    height: {
      3: "0.75rem",
      4: "1rem",
    },
    borderRadius: {
      full: "9999px",
    },
    margin: {
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
    },
    colors: {
      slate: {
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
      },
      indigo: {
        800: "#4338CA",
        700: "#4338CA",
        600: "#4F46E5",
        500: "#6366F1",
        400: "#8B5CF6",
        300: "#A855F7",
        200: "#C084FC",
        100: "#D6BCFA",
        50: "#E9D8FD",
      },
    },
    fontSize: {
      sm: ["0.875rem", { lineHeight: "1.25rem" }],
    },
  },
});
