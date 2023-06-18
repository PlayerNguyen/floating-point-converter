import React, { useState } from "react";
import classnames from "classnames";

export default function Converter() {
  const [sign, setSign] = useState(false);
  const [exponent, setExponent] = useState([...Array(8)].fill(false));
  const [mantissa, setMantissa] = useState([...Array(23)].fill(false));

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

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-row w-1/2 items-center gap-4">
        <b>Float number</b>
        <input className="input input-md input-bordered" />
      </div>

      <div className="flex flex-row gap-2">
        {/* First group */}
        <div>
          <input type="checkbox" className="checkbox" />
        </div>
        {/* Second group */}
        <div className="flex flex-col items-center">
          <div>
            <b>Exponent </b>
          </div>
          <div className="flex flex-row gap-2">
            {[...exponent].map((value, _index) => (
              <BitSwitcher
                status={value}
                onChange={() => handleExponentChange(_index)}
              />
            ))}
          </div>
        </div>

        {/* Third group */}
        <div>
          {mantissa.map((value, _index) => (
            <div className="inline-block flex-col">
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
  return (
    <div className="flex flex-col items-center font-mono">
      <b className="text-accent">{status ? `1` : `0`}</b>
      <input
        type="checkbox"
        className={classnames(`checkbox`, className)}
        onChange={onChange}
        checked={status}
      />
    </div>
  );
}
