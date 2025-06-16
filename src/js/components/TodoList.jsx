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
  const [showCard, setShowCard] = useState(false);
  const [newTask, setNewTask] = useState({ text: "", content: "" });

  useEffect(() => {
    setIsEmpty(items.length === 0);
  }, [items]);

  useEffect(() => {
    getTodoList()

  },[])

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleAddTask = () => {
  setShowCard(true);
};

  const handleSaveTask = () => {
  if (newTask.text.trim() !== "") {
    setItems([...items, { id: items.length + 1, ...newTask }]);
    setShowCard(false);
    setNewTask({ text: "", content: "" });
  }
};



  const getTodoList = async () => {
    const response = await fetch ("https://playground.4geeks.com/todo/users/test101");
    const data = await response.json();
    console.log(data);
  }

  const postTodoList = async () => {
    let newTask = {
      label: "New Task",
      is_done: false
    }

    await fetch ("https://playground.4geeks.com/todo/todos/test101",{
      method: "POST",
      body: JSON.stringify(newTask),
      headers: {"Content-Type": "application/json"}
    });
  }

  const deleteTodoList = async () => {
    await fetch ("https://playground.4geeks.com/todo/users/test101",{
      method:"DELETE",
      body: JSON.stringify(newTask),
      headers: {"Content-Type": "application/json"}
    });
  }

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
    <div className="button-container">
			 <button className="btn btn-warning" onClick={handleAddTask}>
      Add Task
    </button>       
  </div> 
  {showCard && (
    <div className="card">
      <h5 className="card-header">New Task</h5>
      <div className="card-body">
        <input
          type="text"
          placeholder="Title"
          value={newTask.text}
          onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
        />
        <textarea
          placeholder="Description of your task"
          value={newTask.content}
          onChange={(e) => setNewTask({ ...newTask, content: e.target.value })}
        />
        <button className="btn btn-success" onClick={handleSaveTask}>
          Save
        </button>
      </div>
    </div>
  )};
  {}
</div>)}
