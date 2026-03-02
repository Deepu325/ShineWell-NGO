const Card = ({ 
  children, 
  variant = 'default', 
  className = '',
  hover = true 
}) => {
  const baseClasses = 'bg-white rounded-card border border-gray-100 transition-all duration-normal';
  
  const variants = {
    default: 'p-8 shadow-card',
    elevated: 'p-10 shadow-elevated',
    floating: 'p-12 shadow-floating'
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1' : '';
  
  return (
    <div className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
