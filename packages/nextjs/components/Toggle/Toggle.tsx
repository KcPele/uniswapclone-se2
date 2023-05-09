import React from "react";
//INTERNAL IMPORT
import Style from "./Toggle.module.css";

const Toggle = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center">
      <div className="relative w-[75px] inline-block text-left top-2">
        <input type="checkbox" className={Style.Toggle_checkbox} name={label} id={label} />
        <label className={Style.Toggle_label} htmlFor={label}>
          <span className={Style.Toggle_inner} />
          <span className={Style.Toggle_switch} />
        </label>
      </div>
    </div>
  );
};

export default Toggle;
