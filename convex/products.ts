import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getProducts = query({
  args: {},
  handler: async (ctx, args) => {
    const products = await ctx.db.query("products").collect();

    return products;
  },
});

export const addProduct = mutation({
  args: {
    name: v.string(),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    const productId = await ctx.db.insert("products", {
      name: args.name,
      price: args.price,
    });

    return productId;
  },
});

export const updateProduct = mutation({
  args: {
    id: v.id("products"),
    name: v.string(),
    price: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      name: args.name,
      price: args.price,
    });
  },
});

export const deleteProduct = mutation({
  args: {
    id: v.id("products"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
