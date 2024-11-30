import "./TooltipIcon.scss";

const TooltipIcon = ({ icon, tooltip }) => {
  return (
    <div className="tooltipIcon-container">
      {icon}
      <span className="tooltip">{tooltip}</span>
    </div>
  );
};

export default TooltipIcon;
