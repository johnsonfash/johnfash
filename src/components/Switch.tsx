import React from "react";
import { useEffect } from "react";
import { useState } from "react";

interface SwitchProps {
  size?: string
  value?: boolean
  onChange?: (v: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  id?: string
}

function Switch({ size, value = false, onChange, name, id }: SwitchProps) {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <label
      className={`switch-${size} switch-button position-relative d-inline-block`}
    >
      <input
        type="checkbox"
        name={name}
        id={id}
        className="d-none"
        onChange={onChange}
        checked={state}
      />
      <span className="slider"></span>
    </label>
  );
}

export default Switch;
