import TodoItem from "@/app/components/todo/TodoItem";
import NewTodoForm from "../components/todo/NewTodoForm";
import { getTodos } from "./_actions";

export default async function ToDo() {
  const data = await getTodos();

  return (
    <div className="py-20">
      <div className="container">
        <h4 className="mb-5">Todos</h4>
        <NewTodoForm />
        <h5 className="mt-5 mb-2 border-b-2">Previous todos:</h5>
        <ul className="flex flex-col gap-1">
          {(data.data ?? []).map((item) => (
            <TodoItem key={item._id} todo={item} />
          ))}
        </ul>
      </div>
    </div>
  );
}
