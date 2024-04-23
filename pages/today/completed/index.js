import { MongoClient } from "mongodb";

export default function CompletedTasks({ todos }) {
  const list = todos.map((todo, index) => {
    return (
      <tr key={index}>
        <td>
          <strong>{todo.title}</strong>
        </td>
        <td>{todo.description}</td>
      </tr>
    );
  });
  return (
    <>
      <div>
        <h2>Today</h2>
        <table className="table">
          <tbody>{list}</tbody>
        </table>
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
  const todos = await todosCollection.find({ completed: true }).toArray();

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
