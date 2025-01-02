"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const addTask = useMutation(api.tasks.addTask); // Mutation to add a task
  const tasks = useQuery(api.tasks.get); // Query to fetch tasks

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return; // Avoid empty submissions
    await addTask({ text: inputValue }); // Call the Convex mutation to add the task
    setInputValue(""); // Clear the input
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task"
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Add Task
        </button>
      </form>

      <ul className="mt-8">
        {tasks?.map((task) => (
          <li key={task._id} className="p-2 border-b">
            {task.text}
          </li>
        ))}
      </ul>
    </main>
  );
}
