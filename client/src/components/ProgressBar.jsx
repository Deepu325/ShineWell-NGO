const ProgressBar = ({ 
  current, 
  goal, 
  label, 
  showPercentage = true,
  className = '' 
}) => {
  const percentage = Math.min((current / goal) * 100, 100);
  
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className=\"flex justify-between items-center text-sm font-bold\">
          <span>{label}</span>
          {showPercentage && <span className=\"text-accent\">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className=\"w-full h-3 bg-secondary rounded-full overflow-hidden\" role=\"progressbar\" aria-valuenow={percentage} aria-valuemin=\"0\" aria-valuemax=\"100\">
        <div 
          className=\"h-full bg-accent transition-all duration-500 ease-out\"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className=\"flex justify-between text-xs text-muted\">
        <span>₹{current.toLocaleString()}</span>
        <span>₹{goal.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
