import { useState } from "react";

export default function TodoItem({ todo }) {
  const [completed, setCompleted] = useState(false);

  const handleCheckboxChange = () => {
    setCompleted(!completed);
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
        {/* <td><button className="btn btn-danger">Delete</button></td> */}
      </tr>
  );
}
