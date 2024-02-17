import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const botData = [
  {
    id: 0,
    avatar: "/images/user/user-01.png",
    name: "Stock News Sentiment Anaylsis",
    text: "Trading on Alpaca API",
    time: 0,
    statusURL: 'http://192.168.1.141:5000/get_status',
    dot: 6,
  },
];

const getStatus = async () => {
  let botStats = null
  for (let i = 0; i in botData; i++) {
    let status = await fetch(botData[i].statusURL).then(data => data.json())
    botStats = status
  }
  console.log(botStats)
  return botStats
}

const BotCard = () => {
  const [status, setStatus] = useState(null)
  useEffect(() => {
    setStatus(getStatus)
  }, [botData])

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="flex flex-row">
        <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
          Bots
        </h4>
        <Link
          href="/forms/form-layout"
          className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"

        >
          <button className="rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Create New Bot
            </h4>
          </button>
        </Link>
      </div>
      <div>
        {botData.map((bot, key) => (
          <Link
            href="/profile"
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <Image src={bot.avatar} alt="User" width={57} height={56} />
              <span
                className={`absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white 
                ${status ? "bg-meta-3" : `bg-meta-${bot.dot}`}`}
              ></span>
            </div>

            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {bot.name}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {bot.text}
                  </span>
                  <span className="text-xs"> . {bot.time} min</span>
                </p>
              </div>
              {/* {status !== 0 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                  <span className="text-sm font-medium text-white">
                    is Running: {status}
                  </span>
                </div>
              )} */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BotCard;
