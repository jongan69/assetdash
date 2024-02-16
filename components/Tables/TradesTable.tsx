import { JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import Image from "next/image";

const TradesTable = ({ combinedHistory, porfolioValue }) => {

  const filteredHistory = combinedHistory?.reduce((acc: any[], curr: { trade: any; asset: any }) => {
    if (curr.trade.status !== 'canceled') {
      acc.push(curr);
    }
    return acc;
  }, []);

  const calculateReturnPercentage = (trade: any) => {
    const isCrypto = trade.asset.isCrypto;
    const port = parseFloat(porfolioValue)
    if (isCrypto) {
      const side = trade.trade.type // side of trade
      const amount = parseFloat(trade.trade.cost) // amount of trade
      // if trade is sell, portfolio + trade amount / porfolio
      if (side === 'sell') return (((port + amount) / port) - 1)
      // if trade is buy,  100 - (portfolio - trade amount / porfolio)
      if (side === 'buy') return -((1 - (port - amount) / port) * 100)
    } else {
      const side = trade.trade.side
      const amount = parseFloat(trade.trade.filled_avg_price)
      // if trade is sell, portfolio + trade amount / porfolio
      if (side === 'sell') return (((port + amount) / port) - 1)
      // if trade is buy,  100 - (portfolio - trade amount / porfolio)
      if (side === 'buy') return -((1 - (port - amount) / port) * 100)
    }

  }

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

        {filteredHistory && filteredHistory?.map((trade: any, key: any) => (

          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${key === filteredHistory.length - 1
              ? ""
              : "border-b border-stroke dark:border-strokedark"
              }
              `

            }
            key={key}
          >
            {/* {trade.asset.isCrypto && <p>{trade.asset.isCrypto}</p>} */}

            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <div className={`flex-shrink-0
              ${trade.asset.isCrypto
                  ? "bg-red-500" // Set to a specific shade of red, e.g., bg-red-500
                  : "bg-green-500" // Set to a specific shade of green, e.g., bg-green-500
                }
              `}>
                <p>{key}: {trade.asset.isCrypto ? trade.trade.type : trade.trade.side}</p>
                <p>{trade.asset.symbol ?? trade.asset.pair}</p>
                <p className="hidden text-black dark:text-white sm:block">
                  {trade.asset.name?.substring(0, 20) ?? `isCrypto : ${JSON.stringify(trade.asset.isCrypto)?.substring(0, 5)}`}...
                </p>
                <Image
                  src={`https://picsum.photos/200/`}
                  alt="Company"
                  width={48}
                  height={48}
                />

              </div>

            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              {trade.trade.status !== 'expired' &&
                <p className="text-black dark:text-white">
                  ${trade.trade.cost ? parseFloat(trade.trade.cost)?.toFixed(2) : parseFloat(trade.trade.filled_avg_price)?.toFixed(2)}
                </p>
              }
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className={`${(calculateReturnPercentage(trade) > 0) ? "text-meta-3" : "text-meta-1"}`}>
                {calculateReturnPercentage(trade).toString().substring(0, 5) ?? `--`}%
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{trade.trade.status ?? trade.trade.ordertype}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              {trade.asset.isCrypto && trade.trade.type === 'sell'
                && <p className="text-meta-5"> +${trade.trade.cost ? parseFloat(trade.trade.cost)?.toFixed(2) : parseFloat(trade.trade.filled_avg_price)?.toFixed(2)}</p>}
              {!trade.asset.isCrypto && trade.trade.side === 'sell'
                && <p className="text-meta-5"> +${trade.trade.cost ? parseFloat(trade.trade.cost)?.toFixed(2) : parseFloat(trade.trade.filled_avg_price)?.toFixed(2)}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradesTable;;
