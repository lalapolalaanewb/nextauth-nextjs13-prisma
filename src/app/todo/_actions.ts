"use server";

import mongoClient from "@/config/mongo";
import { revalidatePath } from "next/cache";
import { TodoType } from "../../../next-auth";

export async function getTodos() {
  try {
    const client = await mongoClient();
    const todoCollection = await client.db().collection("todo");
    const todos = await todoCollection.find<TodoType>({}).toArray();

    return {
      status: 0,
      message: "Succcessfully get todos data.",
      data: todos,
    };
  } catch (e) {
    console.error("Server Actons Error [/app/todo/_actions] - getTodos: ", e);
    return {
      status: 5,
      message: `Server Actons Error. Something went wrong.`,
    };
  }
}

export async function addTodo(data: string) {
  try {
    const client = await mongoClient();
    const todoCollection = await client.db().collection("todo");
    const todos = await todoCollection.insertOne({
      title: data,
      isCompleted: false,
      created_at: new Date(),
    });

    revalidatePath("/todo");

    return {
      status: 0,
      message: "Succcessfully add new todo data.",
      data: todos,
    };
  } catch (e) {
    console.error("Server Actons Error [/app/todo/_actions] - addTodo: ", e);
    return {
      status: 5,
      message: `Server Actons Error. Something went wrong.`,
    };
  }
}
