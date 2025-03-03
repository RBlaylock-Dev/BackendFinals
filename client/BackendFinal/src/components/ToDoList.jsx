import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [newTodo, setNewTodo] = useState(''); // state for new todo
  const [editingId, setEditingId] = useState(null); // state for the todo being edited
  const [editingText, setEditingText] = useState(''); // state for edit input

  useEffect(() => {
    console.warn('USEEFFECT HIT AGAIN');
    axios
      .get('http://localhost:3000/gettodos')
      .then((res) => {
        console.log('res', res);
        setData(res.data);
      })
      .catch((err) => console.log('err', err));
  }, []); // This will fetch the todos only once on mount

  const handleNewToDo = (e) => {
    setNewTodo(e.target.value); // Simply update the newTodo state directly
  };

  const handleAddTodo = () => {
    if (!newTodo.trim()) return; // Prevent adding empty todos
    const todoItem = {
      todo: newTodo,
      created: new Date(),
    };
    axios
      .post('http://localhost:3000/create', todoItem)
      .then((res) => {
        console.log('Todo added', res);
        setData((prevData) => [...prevData, res.data]); // Add new todo to the state
        setNewTodo(''); // Clear the input field
      })
      .catch((err) => console.log('Error adding todo', err));
  };

  const handleDeleteTodo = (id) => {
    console.log('Deleting todo with ID:', id); // debug
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then((res) => {
        console.log('Todo Deleted:', res.data); // Filter out the deleted item from the state
        setData((prevData) => prevData.filter((item) => item._id !== id));
      })
      .catch((err) => console.log('Error deleting todo:', err));
  };

  const handleEditTodo = (id, currentText) => {
    setEditingId(id); // Set the id of the todo being edited
    setEditingText(currentText); // Set the current text to the input field
  };

  const handleSaveEdit = (id) => {
    axios
      .put(`http://localhost:3000/update/${id}`, { todo: editingText }) // Send updated text to the backend
      .then((res) => {
        console.log('Todo Updated:', res); // Refresh the list from the server after updating
        axios
          .get('http://localhost:3000/gettodos')
          .then((res) => {
            console.log('Updated List:', res.data);
            setData(res.data); // Update the state with the refreshed list
          })
          .catch((err) => console.log('Fetch error after update:', err));
        setEditingId(null); // Exit edit mode
        setEditingText(''); // Clear edit text state
      })
      .catch((err) => console.log('Error updating todo:', err));
  };

  return (
    <>
      <h1>ToDo List</h1>
      {/* Input field and button for adding new todo */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter a new todo"
          value={newTodo}
          onChange={handleNewToDo}
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <button onClick={handleAddTodo} style={{ padding: '5px' }}>
          Add ToDo
        </button>
      </div>

      {/* Display todos */}
      {data &&
        data.map((item) => (
          <div
            key={item._id}
            style={{
              border: '2px solid cyan',
              margin: '10px',
              padding: '10px',
            }}
          >
            {editingId === item._id ? (
              // Edit mode
              <div>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  style={{ marginRight: '10px' }}
                />
                <button onClick={() => handleSaveEdit(item._id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{item.todo}</p>
                <button onClick={() => handleDeleteTodo(item._id)}>
                  Delete
                </button>
                <button onClick={() => handleEditTodo(item._id, item.todo)}>
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
    </>
  );
}

export default App;
