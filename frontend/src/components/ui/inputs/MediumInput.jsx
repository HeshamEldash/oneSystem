import React from "react";

// css in form.css

function MediumInput({ type, value, label, onChange, name, handleBlur }) {
  return (
    <div className="medium_input">
      <label className="label">
        {label}:
       
      </label>
      <input
        className="form-fields"
          type="text"
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          name={name}
        />
    </div>
  );
}

export default MediumInput;
