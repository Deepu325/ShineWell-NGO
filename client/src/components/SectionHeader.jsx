const SectionHeader = ({ 
  badge, 
  title, 
  titleAccent, 
  description, 
  align = 'center',
  className = '' 
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto'
  };
  
  return (
    <div className={`max-w-2xl ${alignClasses[align]} ${className}`}>
      {badge && (
        <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">
          {badge}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-heading mb-4">
        {title} {titleAccent && <span className="text-accent">{titleAccent}</span>}
      </h2>
      {description && (
        <p className="text-muted text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
