import { pgTable, text, serial, integer, date, time, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Service model
export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  image: text("image").notNull(),
  alt: text("alt").notNull(),
});

export const insertServiceSchema = createInsertSchema(services).pick({
  title: true,
  description: true,
  price: true,
  image: true,
  alt: true,
});

export type InsertService = z.infer<typeof insertServiceSchema>;
export type Service = typeof services.$inferSelect;

// Booking model
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  service: text("service").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  message: text("message"),
  processed: boolean("processed").default(false),
  createdAt: text("created_at").notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings)
  .pick({
    name: true,
    email: true,
    phone: true,
    service: true,
    date: true,
    time: true,
    message: true,
  })
  .refine(
    data => {
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(data.email);
    },
    {
      message: "Please enter a valid email address",
      path: ["email"],
    }
  );

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;

// Testimonial model
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  name: text("name").notNull(),
  initials: text("initials").notNull(),
  since: text("since").notNull(),
  color: text("color").notNull(),
  stars: integer("stars").notNull(),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).pick({
  text: true,
  name: true,
  initials: true,
  since: true,
  color: true,
  stars: true,
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
