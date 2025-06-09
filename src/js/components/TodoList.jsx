import { useEffect, useState } from "react"

export const TodoList = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Task 1", content: "Add here a description of your task."},
    { id: 2, text: "Task 2", content: "Add here a description of your task."},
    { id: 3, text: "Task 3", content: "Add here a description of your task."},
    { id: 4, text: "Task 4", content: "Add here a description of your task."},
    { id: 5, text: "Task 5", content: "Add here a description of your task."},
  ]);

  const [selectedId, setSelectedId] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsEmpty(items.length === 0);
  }, [items]);

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="container w-50 p-2">
      <div className="list-group">
        {isEmpty ? (
          <p className="empty-message">No hay más tareas pendientes.</p>
        ) : (
          items.map(item => (
            <div 
              key={item.id} 
              className={`list-group-item list-group-item-action ${selectedId === item.id ? "selected" : ""}`} 
              onClick={() => handleSelect(item.id)}
            >
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{item.text}</h5>
              </div>
              <p className="mb-1">{item.content}</p>
              <button 
                type="button" 
                className="btn-close" 
                aria-label="Close"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item.id);
                }}
              >
              </button>
            </div>
          ))
        )}
    </div>
    </div>

  );
}
