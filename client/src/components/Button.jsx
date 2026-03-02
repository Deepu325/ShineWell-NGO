import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  to, 
  href, 
  onClick, 
  disabled, 
  loading,
  type = 'button',
  className = '',
  ariaLabel
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-bold transition-all duration-normal active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-btn gap-2';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-light hover:shadow-lg hover:-translate-y-0.5',
    accent: 'bg-accent text-primary hover:bg-accent-light hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-secondary'
  };
  
  const sizes = {
    sm: 'px-4 py-1 text-sm',
    md: 'px-8 py-2 text-base',
    lg: 'px-10 py-3 text-lg'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  const content = loading ? (
    <>
      <span className="animate-spin">⏳</span>
      {children}
    </>
  ) : children;
  
  if (to) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  
  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled || loading} 
      className={classes}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
};

export default Button;
