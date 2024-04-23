import { useState, useEffect } from "react";
import axios from "axios";

export default function TodoItem({ todo, onRemove }) {
  const [completed, setCompleted] = useState(todo.completed);

  const handleCheckboxChange = async () => {
    try {
      setCompleted(true);
      const response = await axios.put(`/api/${todo._id}`);
      console.log("put response.data => ", response.data);
      onRemove(todo._id);
      setCompleted(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>
        <strong>{todo.title}</strong>
      </td>
      <td>{todo.description}</td>
    </tr>
  );
}
