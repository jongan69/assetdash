"use client";
import { BRAND } from "@/types/brand";
import Image from "next/image";

const botData = [
  {
    name: "1",
    logo: "/images/brand/brand-01.svg"
  }
]

const TradeData = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Google",
    cost: 3500,
    profit_loss_percentage: "5,768",
    status: "OPEN",
    return: 4800,
  },
  // {
  //   logo: "/images/brand/brand-02.svg",
  //   name: "Twitter",
  //   cost: 2.2,
  //   profit_loss_percentage: "4,635",
  //   status: 467,
  //   return: 4.3,
  // },
  // {
  //   logo: "/images/brand/brand-03.svg",
  //   name: "Github",
  //   cost: 2.1,
  //   profit_loss_percentage: "4,290",
  //   status: 420,
  //   return: 3.7,
  // },
  // {
  //   logo: "/images/brand/brand-04.svg",
  //   name: "Vimeo",
  //   cost: 1.5,
  //   profit_loss_percentage: "3,580",
  //   status: 389,
  //   return: 2.5,
  // },
  // {
  //   logo: "/images/brand/brand-05.svg",
  //   name: "Facebook",
  //   cost: 3.5,
  //   profit_loss_percentage: "6,768",
  //   status: 390,
  //   return: 4.2,
  // },
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        All Trades
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Source
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Trade cost ($)
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              P/L %
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Trade Status
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Total Return ($)
            </h5>
          </div>
        </div>

        {TradeData.map((trade, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              key === TradeData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className="flex-shrink-0">
                <Image src={trade.logo} alt="Brand" width={48} height={48} />
              </div>
              <p className="hidden text-black dark:text-white sm:block">
                {trade.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">${trade.cost}K</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{trade.profit_loss_percentage}%</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{trade.status}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">${trade.return}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
