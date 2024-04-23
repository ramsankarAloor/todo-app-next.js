import { MongoClient, ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "PUT") {
    const { todoId } = req.query;

    if (!todoId) {
      return res.status(400).json({ error: "Todo ID is missing." });
    }

    const client = await MongoClient.connect(
      `mongodb+srv://ramsankaraloor:${process.env.MONGODB_PASSWORD}@cluster0.xggjwq1.mongodb.net/todos`
    );

    try {
      const db = client.db();
      const todosCollection = db.collection("todos");

      // Check if the document exists
      const existingTodo = await todosCollection.findOne({ _id: new ObjectId(todoId) });
      if (!existingTodo) {
        return res.status(404).json({ error: "Todo not found." });
      }

      // Update the document
     await todosCollection.findOneAndUpdate(
        { _id: new ObjectId(todoId) },
        { $set: { completed: true } },
        { returnOriginal: false }
      );

      return res.status(200).json({message : 'task completed.'});
    } catch (error) {
      console.error("Error updating task:", error);
      return res.status(500).json({ error: "Error in task update." });
    } finally {
      client.close();
    }
  }

  return res.status(405).end(); // Method Not Allowed
}

export default handler;
