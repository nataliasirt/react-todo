import PropTypes from 'prop-types';

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

InputWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputWithLabel;