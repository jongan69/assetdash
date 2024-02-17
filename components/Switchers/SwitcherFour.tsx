"use client";
import { useState } from "react";
interface SwitcherFourProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  turnOn: () => void;
  turnOff: () => void;
}

const SwitcherFour: React.FC<SwitcherFourProps> = ({
  enabled,
  setEnabled,
  turnOn,
  turnOff,
}) => {
  const handleClick = () => {
    if (enabled) {
      turnOff();
    } else {
      turnOn();
    }
  };

  return (
    <div>
      <label
        htmlFor="toggle4"
        className="flex cursor-pointer select-none items-center"
        onClick={handleClick}
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle4"
            className="sr-only"
            onChange={() => {
              setEnabled(!enabled);
            }}
          />
          <div className="block h-8 w-14 rounded-full bg-black"></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              enabled && "!right-1 !translate-x-full"
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherFour;
