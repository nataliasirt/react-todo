import { useRef, useEffect } from "react";

const InputWithLabel = ({ label, value, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Focus on the input element
  }, []);

  return (
    <>
      <label>{label}</label>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputWithLabel;

