import { useState } from "react";
import Card from "../../components/ui/Card";
import classes from "../../styles/today-page.module.css";
import axios from "axios";
import { MongoClient } from "mongodb";
import TodoItem from "../../components/todos/TodoItem";

export default function TodayPage({ todos }) {
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [tasks, setTasks] = useState(todos);

  const todoList = tasks.map((task, index) => {
    return (
      <TodoItem todo={task} key={index}/>
    );
  });

  async function handleAddTask() {
    const data = { title, description: desc, completed: false };

    try {
      const response = await axios.post("/api/new-task", data);
      console.log(response.data);
      setTitle("");
      setDesc("");
      setNewTaskOpen(false);

      const newTodo = {
        _id: response.data._id,
        title: data.title,
        description: data.description,
        completed: data.completed,
      };
      setTasks((prevTasks)=>[...prevTasks, newTodo]);
    } catch (error) {
      console.error(error);
    }
    
  }

  function cancelAddTask() {
    setTitle("");
    setDesc("");
    setNewTaskOpen(false);
  }

  return (
    <>
      <div>
        <h2>Today</h2>
      </div>
      <table className="table">
        <tbody>{todoList}</tbody>
      </table>
      <div>
        {newTaskOpen ? (
          <Card>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
            <div className={classes["action-buttons-div"]}>
              <div className={classes["button-wrapper"]}>
                <button
                  className="btn btn-outline-secondary"
                  onClick={cancelAddTask}
                >
                  Cancel
                </button>
              </div>
              <div className={classes["button-wrapper"]}>
                <button
                  className="btn btn-outline-success"
                  onClick={handleAddTask}
                >
                  Add task
                </button>
              </div>
            </div>
          </Card>
        ) : (
          <button
            className="btn btn-outline-danger"
            onClick={() => setNewTaskOpen(true)}
          >
            Add task
          </button>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://ramsankaraloor:${process.env.MONGODB_PASSWORD}@cluster0.xggjwq1.mongodb.net/todos`
  );
  const db = client.db();
  const todosCollection = db.collection("todos");

  // Fetch todos where completed is false
  const todos = await todosCollection.find({ completed: false }).toArray();

  client.close();

  return {
    props: {
      todos: todos.map((todo) => ({
        _id: todo._id.toString(),
        description: todo.description,
        title: todo.title,
        completed: todo.completed,
      })),
    },
  };
}
