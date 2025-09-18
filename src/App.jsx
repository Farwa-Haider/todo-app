import React from 'react'
import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { MdEdit, MdDelete } from "react-icons/md";
import './App.css'
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import Mick from './Components/Mick';

function App() {
  //  

  // Not a good practice to keep this seperate component. We should keep it in return
  // const Todo = ({todo})=>{
  //   return (<>
  //     <div className="todo">{todo.title}</div>
  //     <div className="todo">{todo.desc}</div> 
  //   </>)
  // }

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

  // useEffect(() => {
  //   // Page load hone pe data load
  //   let todoString = localStorage.getItem("todos");
  //   if (todoString) {
  //     settodos((JSON.parse(todoString)) || []) ;
  //   }
  // }, []);

  // Jab todos change hon, update localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log("Updated todos:", todos);
  }, [todos]);


  const handleEdit = (id) => {
    // finding todo which is going to be edit
    const todoToEdit = todos.find(t => t.id === id);
    setTodo(todoToEdit.todo)
    seteditingId(id)
    // setEditText(todoToEdit.todo)
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
    if (todo.trim() === "") { // without trim() "  " empty spaces will be counted
      seterror("Todo cannot be empty")
      return;
    }
    // Clear error if todo is valid
    seterror("")
    if (editingId) {
      const updatedTodos = todos.map(t => t.id === editingId ? { ...t, todo } : t)
      settodos(updatedTodos)
      seteditingId(null)
    } else {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    }
    setTodo(""); // input clear
    // console.log(todos)
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
    <div className="page bg-gray-100">

      <Navbar />

      <div className="container rounded-2xl p-5 min-h-[calc(100vh-5.5rem)] w-full sm:w-11/12 md:w-9/12 lg:w-2/3 mx-auto">
        <h1 className='text-zinc-800 font-bold text-center text-2xl'>i-Tasks Manage your To-do's at one place</h1>
        <div className="addTodo my-5">
          <h1 className='sub text-zinc-800 text-xl font-semibold'>Add a Todo</h1>
          <div className="flex">
            <input onChange={handleChange} value={todo} type="text" className="border-2 w-full rounded-full p-2 px-2 text-lg mt-1 mb-1" placeholder='Enter a To-do' />
            {/* <Mick /> */}
            <Mick onAddTodo={(newTodo) => settodos((prev) => [...prev, newTodo])} />
            <button onClick={handleSave} className="text-white cursor-pointer text-md mx-2 bg-emerald-800 hover:bg-emerald-700 rounded-3xl my-1 px-5 font-bold border-2 border-black" >Save</button>
          </div>
          <div className="min-h-[20px] mt-1">
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>

          <div className='flex items-center gap-2 text-lg '>
            <input className='accent-emerald-800 w-3.5 h-3.5' onChange={ToggleCompleted} type="checkbox" checked={showcompleted} /> Completed Todos
          </div>
          <h2 className="text-xl font-semibold mt-5">Your Todos</h2>

          <div className="todos">
            {todos.length === 0 && (
              <div className="text-lg m-5">No todos to display</div>
            )}

            {todos
              .filter(item => showcompleted || !item.isCompleted)
              .map((item) => (
                <div
                  key={item.id}
                  className="todo flex justify-between items-start my-3 w-full max-w-2xl flex-wrap"
                >

                  <div className='flex flex-wrap justify-between gap-5 max-w-2xl w-full my-3 items-center'>

                    <div className="items-center flex gap-3 flex-1">
                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        type="checkbox"
                        checked={item.isCompleted}
                        className="accent-emerald-800 w-3.5 h-3.5 flex-shrink-0"
                      />

                      <div
                        className={`flex-1 p-2 px-2 break-normal whitespace-normal min-w-0 ml-3 ${item.isCompleted ? "line-through" : ""
                          }`}
                      >
                        {item.todo}
                      </div>
                    </div>

                     <div className='buttons gap-2 flex-shrink-0 flex h-full'> 
                       {/* ml-auto h-full justify-between */}
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="todo-btn text-lg px-1 py-2 rounded-lg mx-2 text-white cursor-pointer bg-emerald-800 hover:bg-emerald-700 font-bold"><MdEdit /></button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="todo-btn text-lg px-1 py-2 rounded-lg mx-2 text-white cursor-pointer bg-emerald-800 hover:bg-emerald-700 font-bold"
                      ><MdDelete /></button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {showConfirm && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)',
            minWidth: '300px'
          }}>
            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Are you sure you want to delete this task?</p>
            <div style={{ marginTop: '20px' }}>
              <button onClick={confirmDelete} style={{
                padding: '10px 20px',
                backgroundColor: 'rgb(6,78,59)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}>Yes</button>
              <button onClick={cancelDelete} style={{
                padding: '10px 20px',
                backgroundColor: 'rgb(6,78,59)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}







// function App(){
//   function Car(props) {
//     return <li>I am a {props.brand}</li>;
//   }

//   function Garage() {
//     const cars = ['Ford', 'BMW', 'Audi'];
//     return (
//     <>
//       <h1>Who lives in my garage?</h1>
//       <ul>
//         {cars.map((car) => <Car brand={car} />)}
//       </ul>
//     </>

//   );
//   }
//   const root = ReactDOM.createRoot(document.getElementById('root'));
//   root.render(<Garage />);

// }








// function App() {
//   const [count, setCount] = useState(0)
//   const [showbtn, setshowbtn] = useState(true)
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       {showbtn ? <button>Showbtn is true</button> : "Showbtn is false"}
//       {/* OR */}
//       {/* {showbtn && <button>Showbtn is true</button>} */}
//       <div className="card">
//         <button onClick={() => setshowbtn(!(showbtn))}>
//           Toggle showbtn
//         </button>
//       </div>
//       <div>
//         <button onClick={() => setCount(count + 1)}>Count is {count}</button>
//       </div>
//       <p>
//         Edit <code>src/App.jsx</code> and save to test HMR
//       </p>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//   </>
//   )
// }

export default App
