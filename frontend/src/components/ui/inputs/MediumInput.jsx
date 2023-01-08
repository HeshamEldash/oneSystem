import React from "react";

function MediumInput({ type, value, label, onChange, name, handleBlur }) {
  return (
    <div>
      <label className="label">
        {label}:
        <input
        className="form-fields"
          type="text"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          name={name}
        />
      </label>
    </div>
  );
}

export default MediumInput;
