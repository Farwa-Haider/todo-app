import React from 'react'
import ReactDOM from 'react-dom/client';
import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar';
import { v4 as uuidv4 } from 'uuid';


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
  const [todos, setTodos] = useState([])
  const [error, seterror] = useState("")

  const [showConfirm, setshowConfirm] = useState(false)
  const [deleteId, setdeleteId] = useState(null)

  const [EditingId, setEditingId] = useState(null)
  const [EditText, setEditText] = useState("")

  const handleEdit = (id) => {
    // finding todo which is going to be edit
    const todoToEdit = todos.find(t => t.id === id);
    setEditingId(id)
    setEditText(todoToEdit.todo)
  }

  const handleDelete = (e, id) => {
    setshowConfirm(true)
    setdeleteId(id)
  }

  const confirmDelete = () => {
    const NewTodos = todos.filter(item => item.id !== deleteId);
    setTodos(NewTodos);
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
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
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
    setTodos(NewTodos)
  }

  return (
    <>
      <Navbar />
      {/* {todos.map(todo=>{
        return <Todo todo={todo}/>
      })} */}

      {/* <h1 className='text: font-bold text-lg '>TODO LIST</h1> */}
      {/* {todos.map(todo => (
        <div key={todo.title}>
        <div className="todo">{todo.title}</div>
        <div className="todo">{todo.desc}</div>
        </div>
        ))} */}
      <div className='container mx-10 rounded-2xl p-5 bg-slate-300 min-h-80 '>
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='border-2 w-80 ' />
          <button onClick={handleSave} className=' text-white cursor-pointer px-6 py-1 bg-violet-800 hover:bg-violet-950 rounded-md mx-6 mt-2 mb-3 font-bold '>Save</button>
          <div className="min-h-[20px] mt-1">
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
          <h2 className='text-lg font-bold mt-5'>Your Todos</h2>
          <div className="todos"> 
            {todos.map(item => {
              return <div key={item.id} className="todo flex justify-between w-1/4 my-3 gap-2">
                  <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                  </div>
                  <div className="buttons flex h-full">
                    <button onClick={() => handleEdit(item.id)} className='p-2 py-1 px-3 text-sm rounded-md mx-2 text-white cursor-pointer bg-violet-800 hover:bg-violet-950 font-bold '>Edit</button>
                    <button onClick={(e) => handleDelete(e, item.id)} className='py-1 px-3 rounded-md mx-2  text-white cursor-pointer bg-violet-800 hover:bg-violet-950 font-bold '>Delete</button>
                  </div>
                </div>
            })}
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
                backgroundColor: 'rgb(79, 70, 100)',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '10px'
              }}>Yes</button>
              <button onClick={cancelDelete} style={{
                padding: '10px 20px',
                backgroundColor: 'rgb(79, 70, 100)',
                color: 'black',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
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
