// Componente para o conteúdo interno de um card
function CardContent({ children, className = '' }) {
    return <div className={`card-content ${className}`}>{children}</div>;
}

export default CardContent;