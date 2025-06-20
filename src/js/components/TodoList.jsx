import { useEffect, useState } from "react"

export const TodoList = () => {
  const [items, setItems] = useState([

  ]);

  const [input, setInput] = useState("");
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    getTodoList()

  }, [])

  const getTodoList = async () => {
    const response = await fetch("https://playground.4geeks.com/todo/users/anonimo_1");
    const data = await response.json();
    setItems(data.todos)
  }

  const postTodoList = async ()=> {
    let newTask = {
      label: input,
      is_done: false
    }

    await fetch("https://playground.4geeks.com/todo/todos/anonimo_1",{
      method: "POST",
      body: JSON.stringify(newTask),
      headers: { "Content-Type": "application/json" }
    });
    getTodoList()
  }

  const deleteTodoList = async (id) => {
    await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    });
    getTodoList();
  }

  return (
    <div className="container w-50 p-2">
      <div className="list-group">
        {items.map(item => 
          <div
            key={item.id}
            className= "list-group-item list-group-item-action"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{item.label}</h5>
            </div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                deleteTodoList(item.id);
              }}
            ></button>
          </div>
        ,)};        
        </div>

      <div className="button-container">
        <button className="btn btn-warning" onClick={() => {setShowCard(true) }} >
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-success" onClick={() => {
              postTodoList();
              setInput("");
              setShowCard(false);
            }}>
              Save
            </button>
          </div>
        </div>
      )}
      { }
    </div>)
}
