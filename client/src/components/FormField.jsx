const FormField = ({ 
  label, 
  id, 
  type = 'text', 
  required, 
  error,
  helperText,
  ...props 
}) => {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={id} 
        className="text-sm font-bold text-primary tracking-wide uppercase block"
      >
        {label} {required && <span className="text-error" aria-label="required">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          required={required}
          className="w-full px-6 py-5 bg-secondary/50 rounded-xl outline-none border-2 border-transparent focus:border-accent focus:bg-white transition-all resize-none"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          className="w-full px-6 py-5 bg-secondary/50 rounded-xl outline-none border-2 border-transparent focus:border-accent focus:bg-white transition-all"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...props}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-error text-sm" role="alert">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${id}-helper`} className="text-muted text-sm">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FormField;
