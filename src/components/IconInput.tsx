import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "reactstrap";

interface IconInputProps {
  placeholder?: string;
  className?: string;
  icon: IconProp;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
  iconClick?: () => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  icon2?: IconProp;
  type?: string;
  name?: string;
}

function IconInput({
  placeholder,
  className,
  icon,
  invalid,
  name,
  type,
  onChange,
  minLength,
  disabled,
  required,
  icon2,
}: IconInputProps) {
  const [openPass, setOpenPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setLoading(disabled || false);
  }, [disabled]);

  useEffect(() => {
    setValid(invalid || false);
  }, [invalid]);

  const toggle = () => {
    if (icon2 && !loading) {
      setOpenPass(!openPass);
    }
  };

  return (
    <div className="w-100 position-relative d-flex align-items-center">
      <Input
        name={name}
        disabled={loading}
        minLength={minLength}
        required={required}
        invalid={valid}
        onChange={onChange}
        type={type || (icon2 && !openPass) ? "password" : "text"}
        placeholder={placeholder}
        className={`${className} ${icon2 ? "pe-5" : "ps-5"}`}
      />
      <span
        onClick={toggle}
        className={`d-inline-block text-dark px-3 position-absolute ${
          icon2 ? "end-0 pointer" : "start-0"
        }`}
      >
        <FontAwesomeIcon icon={icon2 && openPass ? icon2 : icon} />
      </span>
    </div>
  );
}

export default IconInput;
