import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Other tables here...


  places: defineTable({
    name: v.string(),
    latitude: v.float64(),
    longitude: v.float64(),
    price_point: v.float64(),
    rating: v.number(),
    city: v.string(),
    description: v.string(),
    category: v.string()
  })

});