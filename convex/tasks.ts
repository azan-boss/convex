import { mutation } from "./_generated/server";
import { query } from "./_generated/server";

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});


export const addTask = mutation({
  handler: async (ctx, { text }) => {
    await ctx.db.insert("tasks", { text, isCompleted: false });
  },
});
