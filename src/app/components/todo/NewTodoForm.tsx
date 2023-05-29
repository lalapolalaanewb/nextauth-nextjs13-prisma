"use client";

import { addTodo } from "@/app/todo/_actions";
import { useState, useTransition } from "react";

export default function NewTodoForm() {
  const [title, settitle] = useState("");
  const [pending, startTransition] = useTransition();

  async function action() {
    if (!title || title === "") alert("title cannot be empty!");

    const res = await addTodo(title);
    if (res.status !== 0) alert(res.message);

    alert(res.message);
    settitle("");
  }
  return (
    <div className="flex flex-col">
      <label>Create new Todo</label>
      <div className="mt-2">
        <input
          className="appearance-none rounded border-2 border-slate-200 bg-transparent px-4 mr-2"
          type="text"
          name="title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            settitle(e.target.value)
          }
        />
        <button
          disabled={pending}
          className="rounded-md bg-slate-700 text-slate-50 px-2"
          type="button"
          onClick={() => {
            startTransition(async () => {
              await action();
            });
          }}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
}
