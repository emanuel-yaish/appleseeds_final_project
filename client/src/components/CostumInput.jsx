import "./CostumInput.css";

const CostumInput = ({
  onInputChangeCallBack,
  value,
  name,
  type,
  label,
  id,
}) => {
  return (
    <div className="costum-input-container">
      <label className="costum-input-label" htmlFor={id}>
        {value === "" ? " " : label}
      </label>
      <input
        className="costum-input"
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onInputChangeCallBack}
        placeholder={label}
      />
    </div>
  );
};

export default CostumInput;
