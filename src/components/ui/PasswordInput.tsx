"use client";

import React, { useState } from "react";
import Input, { InputProps } from "./Input";

/**
 * PasswordInput
 * Input with a show/hide toggle.
 * Mirrors irukei's PasswordField component.
 */
const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<InputProps, "type">
>((props, ref) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input ref={ref} type={show ? "text" : "password"} {...props} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-[34px] text-ink-lighter hover:text-ink focus:outline-none text-xs"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? "Hide" : "Show"}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
export default PasswordInput;
