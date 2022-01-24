import "./StepsNav.css";

function StepsNav(props) {
  const { steps, currentFormType, formTypeChangeCallback } = props;

  return (
    <div className="step-nav">
      {steps.map((step) => (
        <button
          onClick={() => formTypeChangeCallback(step)}
          key={step}
          className={`step-button ${currentFormType === step ? "active" : ""}`}
        >
          {step}
        </button>
      ))}
    </div>
  );
}

export default StepsNav;
