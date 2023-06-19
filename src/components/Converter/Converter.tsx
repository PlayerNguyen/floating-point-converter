import React, { useEffect, useState } from "react";
import classnames from "classnames";
import { parseFloat32, parseIntFromBitPattern } from "../../utils/FloatParser";

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
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-row w-1/2 items-center gap-4">
        <b>Float number</b>
        <input
          className="input input-ghost input-sm w-1/2 "
          value={floatValue}
        />
      </div>

      <div className="flex flex-row gap-4">
        {/* First group */}
        <div>
          <div>
            <b>Sign </b>
            <p>
              2{" "}
              <b>
                <sup>{parseIntFromBitPattern(false, exponent) - 127}</sup>
              </b>
            </p>
          </div>
          <BitSwitcher status={sign} onChange={handleSignChange} />
        </div>

        {/* Second group */}
        <div className="flex flex-col items-center">
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
                status={value}
                onChange={() => handleExponentChange(_index)}
                key={_index}
              />
            ))}
          </div>
        </div>

        {/* Third group */}
        <div className="border rounded-xl px-6 py-4 flex flex-col items-center">
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
      className="flex flex-col items-center font-mono"
      onMouseOver={handleMouseOver}
    >
      <b className="text-accent selection:bg-none">{status ? `1` : `0`}</b>
      <input
        type="checkbox"
        className={classnames(`checkbox`, className)}
        onChange={onChange}
        checked={status}
      />
    </div>
  );
}
