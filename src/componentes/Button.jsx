// Componente de botão reutilizável
function Button({ children, className = '', variant = 'default', size = 'md', ...props }) {
    const classes = `button variant-${variant} size-${size} ${className}`;
    return <button className={classes} {...props}>{children}</button>;
}

export default Button;