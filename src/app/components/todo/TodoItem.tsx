import { TodoType } from "../../../../next-auth";

export default function TodoItem(props: { todo: TodoType }) {
  return <li>{props.todo.title}</li>;
}
