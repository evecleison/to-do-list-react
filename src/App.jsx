import { useEffect, useState } from 'react';
import Card from './componentes/Card.jsx';
import CardContent from './componentes/CardContent.jsx';
import Input from './componentes/Input.jsx';
import Button from './componentes/Button.jsx';
import './App.css';

function App() {
  // estados
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  // Carrega as tarefas do localStorage ao montar o componente
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Salva as tarefas no localStorage sempre que a lista for atualizada
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Formata a data para o formato brasileiro
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('pt-BR');
  };

  // Adiciona ou edita uma tarefa
  const handleAdd = () => {
    // Se o campo de texto estiver vazio (ou só espaços), não faz nada
    if (!text.trim()) 
      return;

    if (editingIndex !== null) { // Se estamos editando uma tarefa existente
      // Atualiza o conteúdo da tarefa no índice que estamos editando
      const copy = [...tasks];
      copy[editingIndex] = { ...copy[editingIndex], text, category, date };

      // Atualiza a lista de tarefas e reseta o índice de edição 
      setTasks(copy);
      setEditingIndex(null);

    } else { // Se não estamos editando, adiciona uma nova tarefa à lista
      setTasks([...tasks, { text, completed: false, category, date }]);
    }

    // Limpa os campos do formulário depois de adicionar ou editar
    setText('');
    setCategory('');
    setDate('');
  };

  // Marca a tarefa como feita ou não feita alternando o valor booleano
  const toggleComplete = idx => {
    const copy = [...tasks];
    copy[idx].completed = !copy[idx].completed;
    setTasks(copy);
  };

  // Remove uma tarefa da lista de tarefas (tasks) com base no índice (idx)
  const deleteTask = idx => setTasks(tasks.filter((_, i) => i !== idx));

  // Função que prepara uma tarefa para edição
  const editTask = idx => {
    const t = tasks[idx];

    // Define o texto, categoria e a data da tarefa
    setText(t.text);
    setCategory(t.category || '');
    setDate(t.date || '');

    // Define o texto, categoria e a data da tarefa
    setEditingIndex(idx);
  };

  return (
    <div className="container"> 
      <h1 className="title">Lista de Tarefas</h1> 
  
      {/* Agrupamento dos campos do formulário */}
      <div className="form-group"> 
        
        {/* Campo para digitar o texto da tarefa */}
        <Input
          placeholder="Adicionar tarefa"
          value={text}
          onChange={e => setText(e.target.value)} 
        />
  
        {/* Campo para digitar a categoria da tarefa */}
        <Input
          placeholder="Categoria"
          value={category}
          onChange={e => setCategory(e.target.value)} 
        />
  
        {/* Campo para definir a data da tarefa */}
        <Input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)} 
        />
  
        {/* Botão para adicionar ou salvar a tarefa, dependendo do modo (edição ou novo) */}
        <Button onClick={handleAdd}>
          {editingIndex !== null ? 'Salvar' : 'Adicionar'}
        </Button>
      </div>
  
      {/* Lista de tarefas renderizadas dinamicamente */}
      <div className="task-list">
        {tasks.map((task, idx) => (
          
          // Cada tarefa é renderizada dentro de um Card, com estilo "completed" se estiver concluída
          <Card key={idx} className={task.completed ? 'completed' : ''}>
            <CardContent className="task-item">
              {/* Checkbox para marcar ou desmarcar tarefa como concluída */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(idx)} // Alterna o estado de conclusão
              />
  
              {/* Informações da tarefa (texto, categoria, data) */}
              <div className="task-info">
  
                {/* Texto da tarefa com classe riscada se estiver concluída */}
                <div className={`task-text ${task.completed ? 'completed-text' : ''}`}>
                  {task.text}
                </div>
  
                {/* Categoria da tarefa (ou "-" se estiver vazia) */}
                <div className="task-meta">Categoria: {task.category || '-'}</div>
  
                {/* Data formatada (ou "-" se vazia) */}
                <div className="task-meta">
                  Data: {task.date ? formatDate(task.date) : '-'}
                </div>
              </div>
  
              {/* Botões de editar e deletar a tarefa */}
              <div className="task-actions">
                <Button size="icon" variant="ghost" onClick={() => editTask(idx)}>✏️</Button>
                <Button size="icon" variant="ghost" onClick={() => deleteTask(idx)}>🗑️</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}  
export default App;