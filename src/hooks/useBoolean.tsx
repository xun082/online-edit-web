import { useState } from "react";

export default function useBoolean(defaultValue: boolean) {
  const [value, setValue] = useState(defaultValue);

  const onTrue = () => {
    setValue(true);
  };

  const onFalse = () => {
    setValue(false);
  };

  const onToggle = () => {
    setValue(prev => !prev);
  };

  return {
    value,
    onTrue,
    onFalse,
    onToggle,
    setValue,
  };
}
