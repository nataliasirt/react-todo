const InputWithLabel = ({ label, value, onChange }) => {
  return (
    <div>
      <label>
        {label}
        <input type="text" value={value} onChange={onChange} />
      </label>
    </div>
  );
};

export default InputWithLabel;
