import React, { useEffect, useState } from "react";
import classnames from "classnames";
import {
  parseBinaryFromBitPattern,
  parseFloat32,
  parseIntFromBitPattern,
} from "../../../utils/FloatParser";
import classNames from "classnames";
import GroupInputValue from "../../GroupInputValue";

export default function Converter() {
  const [sign, setSign] = useState(false);
  const [exponent, setExponent] = useState([...Array(8)].fill(false));
  const [mantissa, setMantissa] = useState([...Array(23)].fill(false));
  const [floatValue, setFloatValue] = useState<number>(0.0);

  const handleExponentChange = (index) => {
    setExponent((exponent) =>
      exponent.map((value, _idx) => {
        if (_idx === index) {
          return !value;
        }
        return value;
      })
    );
  };

  const handleMantissaChange = (index) => {
    setMantissa((mantissa) =>
      mantissa.map((value, _idx) => {
        if (_idx === index) {
          return !value;
        }
        return value;
      })
    );
  };

  const handleSignChange = () => {
    setSign((currentSign) => !currentSign);
  };

  useEffect(() => {
    // console.log(parseFloat32([sign, ...exponent, ...mantissa]));

    setFloatValue(parseFloat32([sign, ...exponent, ...mantissa]));
  }, [sign, exponent, mantissa]);

  return (
    <div className="flex flex-col items-center gap-4 my-6">
      <div className="flex flex-col w-full px-12 gap-4 md:w-1/2">
        <GroupInputValue title={`Decimal float`} value={floatValue} />
        <GroupInputValue
          title={`IEEE 754`}
          value={parseBinaryFromBitPattern([sign, ...exponent, ...mantissa])}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 select-none">
        <div className={classNames(`flex flex-row gap-4`)}>
          {/* First group */}
          <div className="md:border rounded-xl px-6 py-4 flex flex-col md:items-center">
            <div>
              <b>Sign </b>
              <p>
                <b>
                  <sup>{sign ? -1 : 0}</sup>
                </b>
              </p>
            </div>
            <BitSwitcher
              status={sign}
              className="checkbox-primary"
              onChange={handleSignChange}
            />
          </div>

          {/* Second group */}
          <div className="md:border rounded-xl py-4 px-2 md:px-4 flex flex-col items-center">
            <div>
              <b>Exponent </b>
              <p>
                2{" "}
                <b>
                  <sup>{parseIntFromBitPattern(false, exponent) - 127}</sup>
                </b>
              </p>
            </div>
            <div className="flex flex-row gap-2">
              {[...exponent].map((value, _index) => (
                <BitSwitcher
                  className="checkbox-secondary"
                  status={value}
                  onChange={() => handleExponentChange(_index)}
                  key={_index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Third group */}
        <div className="md:border  rounded-xl px-6 py-4 flex flex-col items-center">
          <div>
            <b>Mantissa </b>
            <p>{1.0 + parseIntFromBitPattern(true, mantissa)}</p>
          </div>

          <div className="flex flex-row gap-1">
            {mantissa.map((value, _index) => (
              <div className="inline-block flex-col" key={_index}>
                <BitSwitcher
                  className="checkbox-accent"
                  status={value}
                  onChange={() => handleMantissaChange(_index)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <span className="text text-primary-content/40">
        Try to mouse-down and slide over the boxes
      </span>
    </div>
  );
}

function BitSwitcher({
  status,
  onChange,
  className,
}: {
  status: boolean;
  onChange: () => void;
  className?: string;
}) {
  const [isClicking, setClicking] = useState<boolean>(false);

  useEffect(() => {
    const mousedownListener = () => {
      setClicking(true);
    };
    const mouseupListener = () => {
      setClicking(false);
    };
    document.addEventListener("mousedown", mousedownListener);
    document.addEventListener("mouseup", mouseupListener);
    () => {
      document.removeEventListener("mousedown", mousedownListener);
      document.removeEventListener("mouseup", mouseupListener);
    };
  }, []);

  const handleMouseOver = () => {
    if (isClicking) {
      onChange();
    }
  };

  return (
    <div
      className="flex flex-col md:items-center font-mono select-none"
      onMouseOver={handleMouseOver}
    >
      <b className="text-accent selection:bg-none">{status ? `1` : `0`}</b>
      <input
        type="checkbox"
        className={classnames(`checkbox`, `checkbox-xs`, className)}
        onChange={onChange}
        checked={status}
      />
    </div>
  );
}
