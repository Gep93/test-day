import React, { useState } from "react";

function useCopyPaste() {
  const [selected, setSelected] = useState("");
  const [copied, setCopied] = useState("");

  const select = (val: string) => {
    setSelected(val);
  };

  const copy = () => {
    setCopied(selected);
  };

  return [selected, copied, copy, select];
}

export default useCopyPaste;
