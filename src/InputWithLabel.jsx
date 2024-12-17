import { useRef, useEffect } from 'react';

const InputWithLabel = ({ label, value, onChange }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Focuses on the input every time the component is rendered
  }, []);

  return (
    <>
      <label>{label}</label>
      <input
        ref={inputRef} // Using ref to focus on the input element
        type="text"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputWithLabel;
