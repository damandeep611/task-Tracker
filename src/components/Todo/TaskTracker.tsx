import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Clock, Trash } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { format } from "date-fns";

interface Task {
  id: number,
  text: string,
  isCompleted: boolean,
  createdAt: string
}

export default function TaskTracker(){
  const [tasks, setTasks] = useState<Task[]>(()=> {
    const savedTasks = localStorage.getItem('todos');
    if(savedTasks){
      return JSON.parse(savedTasks)
    }else{
      return []
    }
  });
  const [newTask, setNewTask] = useState('')

  // run useEffect when the component mounts 
  useEffect(()=> {
    // stringify to convert the object into  a josn string as local storage supports storing strings as key and value pairs
    localStorage.setItem('todos', JSON.stringify(tasks))
    // tasks as dependency as the local storage will update whenever tasks state changes 
  },[tasks])



  // add task 
  const addTask = () => {
    if (newTask.trim() !== ''){
      setTasks([...tasks, {id: Date.now(), text: newTask, isCompleted: false, createdAt: format(new Date(), 'MMM d, yyyy HH:mm')}])
      setNewTask('')
    }
  }

  // adding task on enter button 
  const handleKeyDown = (e)=> {
    if(e.key === 'Enter'){
      addTask()
    }
  }

  // delete the task 
  const deleteTask = (id:number)=> {
    setTasks(tasks.filter(task => task.id !== id))
  }
  
  // check completed task 
  const toggleTask = (id:number)=> {
    setTasks(tasks.map(task => task.id === id ? {...task, isCompleted : !task.isCompleted} : task))
  }
  // tracking total tasks and completed tasks 
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.isCompleted).length;

  return(
    <section className="max-w-md mx-auto flex flex-col  rounded shadow-lg p-6 mt-6 bg-gray-100">
      <h1 className="text-2xl font-semibold">PushEverySecond</h1>
      <div className="flex items-center justify-between gap-2">
        <Input type="text" value={newTask} onChange={(e)=> setNewTask(e.target.value)} onKeyDown={handleKeyDown} placeholder="Enter Task"/>
        <Button onClick={addTask}>Add</Button>
      </div>
      <div className="space-y-2 mt-2">
        {tasks.map((task => (
          <div key={task.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
            <div className="flex justify-center items-center">
            <Checkbox checked={task.isCompleted} onCheckedChange={()=> toggleTask(task.id)} className="mr-2"/>
           <div className="flex flex-col ">
           <span className={task.isCompleted ? 'text-gray-500 line-through' : 'font-semibold'}>{task.text}</span>
           <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-3 w-3"/>
            {task.createdAt}
           </div>
           </div>
            </div>
            <Button onClick={()=> deleteTask(task.id)}>
              <Trash  className="w-4 h-4"/>
            </Button>
          </div>
        )))}
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-500">Total tasks: {totalTasks}</span>
        <span className="text-sm text-gray-500">Completed Tasks: {completedTasks}</span>
        <span className="text-sm text-gray-500">Pending Tasks: {totalTasks - completedTasks}</span>
      </div>
    </section>
  )
}