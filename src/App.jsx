import React from 'react'
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react'
import { MdEdit, MdDelete } from "react-icons/md";
import './App.css'
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import Mick from './Components/Mick';

function App() {
  const [todo, setTodo] = useState("")
  const [error, seterror] = useState("")
  const [showcompleted, setshowcompleted] = useState(true)

  const [showConfirm, setshowConfirm] = useState(false)
  const [deleteId, setdeleteId] = useState(null)

  const [editingId, seteditingId] = useState(null)

  const [todos, settodos] = useState(() => {
    const saved = localStorage.getItem("todos")
    return saved ? JSON.parse(saved) : []
  }
  )

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("Updated todos:", todos);
  }, [todos]);


  const handleEdit = (id) => {
    const todoToEdit = todos.find(t => t.id === id);
    setTodo(todoToEdit.todo)
    seteditingId(id)
  }

  const handleDelete = (e, id) => {
    setshowConfirm(true)
    setdeleteId(id)
  }

  const confirmDelete = () => {
    const NewTodos = todos.filter(item => item.id !== deleteId);
    settodos(NewTodos);
    setshowConfirm(false);
    setdeleteId(null);
  };


  const cancelDelete = () => {
    setshowConfirm(false)
    setdeleteId(null)
  }

  const handleSave = () => {
    if (todo.trim() === "") {
      seterror("Todo cannot be empty")
      return;
    }
    seterror("")
    if (editingId) {
      const updatedTodos = todos.map(t => t.id === editingId ? { ...t, todo } : t)
      settodos(updatedTodos)
      seteditingId(null)
    } else {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    }
    setTodo("");
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    console.log(e, e.target)
    let id = e.target.name
    console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(`The index is ${index}`)
    let NewTodos = [...todos]
    NewTodos[index].isCompleted = !NewTodos[index].isCompleted
    settodos(NewTodos)
  }

  const ToggleCompleted = (e) => {
    setshowcompleted(!showcompleted)
  }

  return (
    <div className="page bg-gray-100 min-h-screen">
      <Navbar />

      <div className="container rounded-2xl p-4 sm:p-6 md:p-8 min-h-[calc(100vh-5.5rem)] w-11/12 sm:w-10/12 md:w-9/12 lg:w-2/3 mx-auto">
        <h1 className='text-zinc-800 font-bold text-center text-2xl sm:text-3xl'>i-Tasks Manage your To-do's at one place</h1>
        <div className="addTodo my-5">
          <h1 className='sub text-zinc-800 text-lg sm:text-xl font-semibold mb-2'>Add a Todo</h1>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input onChange={handleChange} value={todo} type="text" className="border-2 w-full rounded-full p-2 text-base sm:text-lg" placeholder='Enter a To-do' />

            <div className="flex gap-2 justify-center sm:justify-start">
              <Mick onAddTodo={(newTodo) => settodos((prev) => [...prev, newTodo])} />
              <button onClick={handleSave} className="text-white cursor-pointer bg-emerald-800 hover:bg-emerald-700 rounded-3xl px-6 py-2 font-bold border-2 border-black" >Save</button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          <div className="min-h-[20px] mt-1">
          </div>

          <div className='flex items-center gap-2 mt-4 text-base sm:text-lg'>
            <input className='accent-emerald-800 w-4 h-4' onChange={ToggleCompleted} type="checkbox" checked={showcompleted} />{" "} Show Completed Todos
          </div>
          <h2 className="text-xl font-semibold mt-6">Your Todos</h2>

          <div className="todos mt-3">
            {todos.length === 0 && (
              <div className="text-lg text-center m-5">No todos to display</div>
            )}

            {todos
              .filter(item => showcompleted || !item.isCompleted)
              .map((item) => (
                <div
                  key={item.id}
                  className="todo flex flex-col sm:flex-row justify-between items-center bg-white shadow-sm p-3 rounded-lg my-2"
                >

                  <div className='flex flex-1 gap-3 w-full sm:w-auto items-center'>

                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        className="accent-emerald-800 w-4 h-4 flex-shrink-0"
                      />

                      <div
                        className={`flex-1 break-words text-base sm:text-lg ${
                    item.isCompleted ? "line-through text-gray-500" : ""
                  }`}
                      >
                        {item.todo}
                    </div>
                    </div>


                    <div className='buttons gap-2 flex mt-3 sm:mt-0'>
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-lg px-2 py-2 rounded-lg text-white bg-emerald-800 hover:bg-emerald-700"><MdEdit /></button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="text-lg px-2 py-2 rounded-lg text-white bg-emerald-800 hover:bg-emerald-700"
                      ><MdDelete /></button>
                    </div>
                  </div>
              ))}
          </div>
        </div>
      </div>

      {showConfirm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>

          <div className='bg-white p-6 rounded-xl shadow-lg text-center max-w-xs w-11/12'>
 
            <p className='font-semibold text-lg mb-4'>Are you sure you want to delete this task?</p>
 
            <div className='flex justify-center gap-4'>
              <button onClick={confirmDelete} className='px-4 py-2 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700'>Yes</button>
              
              <button onClick={cancelDelete} className='px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400'>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default App
