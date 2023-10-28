import { v } from "convex/values"
import { query, mutation, action } from "./_generated/server"

// Write your Convex functions in any file inside this directory (`convex`).
// See https://docs.convex.dev/functions for more.

// // You can read data from the database via a query function:
// export const listIdeas = query({
//   // Validators for arguments.
//   args: {},

//   // Query function implementation.
//   handler: async (ctx, args) => {
//     // Read the database as many times as you need here.
//     // See https://docs.convex.dev/database/reading-data.
//     return await ctx.db.query("ideas").collect()
//   },
// })

// You can write data to the database via a mutation function:
// export const saveIdea = mutation({
//   // Validators for arguments.
//   args: {
//     idea: v.string(),
//     random: v.boolean(),
//   },

//   // Mutation function implementation.
//   handler: async (ctx, args) => {
//     // Insert or modify documents in the database here.
//     // Mutations can also read from the database like queries.
//     // See https://docs.convex.dev/database/writing-data.

//     // Optionally, capture the ID of the newly created document
//     const id = await ctx.db.insert("ideas", args)

//     // Optionally, return a value from your mutation.
//     return id
//   },
// })

// You can fetch data from and send data to third-party APIs via an action:
// export const fetchRandomIdea = action({
//   // Validators for arguments.
//   args: {},

//   // Action implementation.
//   handler: async (ctx) => {
//     // Use the browser-like `fetch` API to send HTTP requests.
//     // See https://docs.convex.dev/functions/actions#calling-third-party-apis-and-using-npm-packages.
//     const response = await fetch("https://appideagenerator.com/call.php")
//     const idea = await response.text()

//     // Write or query data by running Convex mutations/queries from within an action
//     await ctx.runMutation(api.myFunctions.saveIdea, {

//       idea: idea.trim(),
//       random: true,
//     })

  
//     // createUser(ctx, {}) text: "Your task text here" })

//     // Optionally, return a value from your action
//     return idea
//   },
// })
// export const createUser = mutation({
//   args: {},
//   handler: async (ctx) => {
//     await ctx.db.insert("users", { user_id: 1, username: 'hi', password:'hi'});
//   },
// });

export const get_attractions = query({
    args:{city:v.string(),price_high:v.float64(), price_low:v.float64()},
    handler: async (ctx,args) => {
      const places = await ctx.db
      .query("attractions")
      .filter((q) => q.eq(q.field("city"), args.city))
      .filter((q) => q.lte(q.field("price_point"), args.price_high))
      .filter((q) => q.gte(q.field("price_point"), args.price_low))
      .collect();
      // do something with `tasks`
      return places
    },
  });