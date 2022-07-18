import React, { FC, useEffect, useState } from "react";

type CheckedProps = {
  value?: boolean;
  onChange?: (value?: boolean) => void;
  disabled?: boolean;
  children: JSX.Element | JSX.Element[];
};

const Checked: FC<CheckedProps> = (props) => {
  const { value, onChange = () => {}, disabled, children } = props;
  const [checked, setChecked] = useState(false); // 切换选中

  useEffect(() => {
    setChecked(value);
  }, [value]);
  return (
    <div
      className="checkbox-button"
      onClick={() => {
        onChange(!checked);
      }}
    >
      <input checked={!!checked} readOnly type="checkbox" disabled={disabled} />
      {children}
    </div>
  );
};

export default Checked;
