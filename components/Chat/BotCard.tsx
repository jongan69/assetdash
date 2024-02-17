import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import SwitcherFour from "../Switchers/SwitcherFour";
import ky from 'ky';

const botData = [
  {
    id: 0,
    avatar: "/images/user/user-01.png",
    name: "Stock News Sentiment Anaylsis",
    text: "Trading on Alpaca API",
    time: 0,
    statusURL: 'http://192.168.1.141:5000/get_status',
    turnOn: 'http://192.168.1.141:5000/start_bot',
    turnOff: 'http://192.168.1.141:5000/stop_bot',
  },
];

const BotCard = () => {
  const [enabled, setEnabled] = useState<boolean>(false);

  const getStatus = async () => {
    try {
      const apiStatus = await ky.get(botData[0].statusURL).json()
      console.log(apiStatus)
      if (typeof (apiStatus) === 'boolean') return setEnabled(apiStatus)
    } catch (Exception) {
      throw Exception;
    }
  }

  const turnOn = async () => {
    try {
      const json = await ky.post(botData[0].turnOn).json()
      setEnabled(true)
      return json
    } catch (Exception) {
      throw Exception;
    }
  }

  const turnOff = async () => {
    try {
      const json = await ky.post(botData[0].turnOff).json()
      setEnabled(false)
      return json
    } catch (Exception) {
      throw Exception;
    }
  }

  useEffect(() => {
    getStatus()
  }, [])

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="flex flex-row">
        <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
          Bots
        </h4>

        {/* <Link
          href="/forms/form-layout"
          className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"

        >
          <button className="rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-95">
            <h4 className="text-xl font-semibold text-black dark:text-white">
              Create New Bot
            </h4>
          </button>
        </Link> */}

      </div>
      <div>
        {botData.map((bot, key) => (
          <div
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="relative h-14 w-14 rounded-full">
              <Link
                href="/profile"
                key={key}
              >
                <Image src={bot.avatar} alt="User" width={57} height={56} />
              </Link>
              <span
                className={`absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white 
                ${enabled ? "bg-meta-3" : `bg-meta-6`}`}
              ></span>
            </div>
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {bot.name}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {bot.text}: {JSON.stringify(enabled)}
                  </span>
                  <span className="text-xs"> . {bot.time} min</span>
                </p>
              </div>
              <SwitcherFour
                enabled={enabled}
                setEnabled={setEnabled}
                turnOn={turnOn}
                turnOff={turnOff}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BotCard;
