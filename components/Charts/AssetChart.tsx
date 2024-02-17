"use client";
import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const options: ApexOptions = {
  colors: ["#3C50E0", "#80CAEE"],
  chart: {
    events: {
      beforeMount: (chart) => {
        chart.windowResizeHandler();
      },
    },
    fontFamily: "Satoshi, sans-serif",
    type: "bar",
    height: 335,
    stacked: true,
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: "25%",
          },
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: "25%",
      borderRadiusApplication: "end",
      borderRadiusWhenStacked: "last",
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    fontFamily: "Satoshi",
    fontWeight: 500,
    fontSize: "14px",

    markers: {
      radius: 99,
    },
  },
  fill: {
    opacity: 1,
  },
};
  

interface ChartOneProps {
  combinedHistory: {
    trade: any;
    asset: any;
  }[];
}

const ChartOne: React.FC<ChartOneProps> = ({ combinedHistory }) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Crypto Buys",
        data: [],
      },
      {
        name: "Crypto Sells",
        data: [],
      },
      {
        name: "Stock Buys",
        data: [],
      },
      {
        name: "Stock Sells",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const cryptoBuyData = combinedHistory
      ?.filter((trade) => trade.asset.isCrypto && trade.trade.type === 'buy')
      .map((trade) => trade.trade.cost);

    const cryptoSellData = combinedHistory
      ?.filter((trade) => trade.asset.isCrypto && trade.trade.type === 'sell')
      .map((trade) => trade.trade.cost);

    const stockBuyData = combinedHistory
      ?.filter((trade) => !trade.asset.isCrypto && trade.trade.side === 'buy')
      .map((trade) => trade.trade.filled_avg_price);

    const stockSellData = combinedHistory
      ?.filter((trade) => !trade.asset.isCrypto && trade.trade.side === 'sell')
      .map((trade) => trade.trade.filled_avg_price);

    setState({
      series: [
        { name: "Crypto Buys", data: cryptoBuyData?.reverse() },
        { name: "Crypto Sells", data: cryptoSellData?.reverse() },
        { name: "Stock Buys", data: stockBuyData?.reverse() },
        { name: "Stock Sells", data: stockSellData?.reverse() },
      ],
    });

    // console.log(state)
  }, [combinedHistory]);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      {/* Chart content remains the same... */}
      <div>
        <div id="chartOne" className="-ml-5 h-[355px] w-[105%]">
            {
                state.series[0].data !== undefined && 
                <ReactApexChart
                options={options}
                series={state.series}
                type="area"
                width="100%"
                height="100%"
              />
            }
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
