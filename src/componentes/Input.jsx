// Componente de input de texto
function Input({ className = '', ...props }) {
    return <input className={`input ${className}`} {...props} />;
}

export default Input;