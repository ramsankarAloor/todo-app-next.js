import { useState } from "react";
import Card from "../../components/ui/Card";
import classes from "../../styles/today-page.module.css";
import axios from "axios";

export default function TodayPage() {
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  async function handleAddTask() {
    const data = { title, description: desc };

    try {
      const response = await axios.post("/api/new-task", data);
      console.log(response.data);
      setTitle("");
      setDesc("");
      setNewTaskOpen(false);
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
        <tbody></tbody>
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
            className={classes["add-task-button"]}
            onClick={() => setNewTaskOpen(true)}
          >
            Add task
          </button>
        )}
      </div>
    </>
  );
}
