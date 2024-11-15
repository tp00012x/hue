import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

import { InferSelectModel } from "drizzle-orm";
import { z } from "zod";

export const skinToneEnum = pgEnum("skin_tone", [
  "Fair",
  "Light",
  "Medium",
  "Tan",
  "Dark",
  "Deep",
]);

export const undertoneEnum = pgEnum("undertone", [
  "Pink/Cool",
  "Neutral",
  "Yellow/Warm",
]);

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  skinTone: skinToneEnum("skin_tone").notNull(),
  eyeColor: varchar("eye_color", { length: 50 }).notNull(),
  undertone: undertoneEnum("undertone").notNull(),
});

export const Products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  image: varchar("image", { length: 255 }),
  description: text("description"),
});

export const Shades = pgTable("shades", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .references(() => Products.id)
    .notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  color: varchar("color", { length: 255 }).notNull(),
});

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();

const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const Reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .references(() => Users.id)
      .notNull(),
    productId: integer("product_id")
      .references(() => Products.id)
      .notNull(),
    shadeId: integer("shade_id")
      .references(() => Shades.id)
      .notNull(),
    videoUrl: varchar("video_url", { length: 255 }),
    videoThumbnail: varchar("video_thumbnail", { length: 255 }).notNull(),
    reviewText: text("review_text").notNull(),
    starRating: integer("star_rating").notNull(),
    isVerified: boolean("is_verified").default(true),
    incentivized: boolean("incentivized").default(false),
    createdAt,
    updatedAt,
  },
  (table) => ({
    uniqueUserProduct: uniqueIndex("unique_user_product").on(
      table.userId,
      table.productId,
    ),
  }),
);

export const eventTypeEnum = pgEnum("event_type", ["card_click", "video_play"]);

export const Events = pgTable("events", {
  id: serial("id").primaryKey(),
  reviewId: integer("review_id")
    .references(() => Reviews.id)
    .notNull(),
  productId: integer("product_id")
    .references(() => Products.id)
    .notNull(),
  eventType: eventTypeEnum("event_type").notNull(),
  metadata: jsonb("metadata"),
  timestamp: timestamp("timestamp", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type User = InferSelectModel<typeof Users>;
export type Product = InferSelectModel<typeof Products>;
export type Shade = InferSelectModel<typeof Shades>;
export type Review = InferSelectModel<typeof Reviews>;

export const skinToneSchema = z.enum(skinToneEnum.enumValues);
export type SkinTone = z.infer<typeof skinToneSchema>;

export const undertoneSchema = z.enum(undertoneEnum.enumValues);
export type Undertone = z.infer<typeof undertoneSchema>;

export const eventTypeSchema = z.enum(eventTypeEnum.enumValues);
export type EventType = z.infer<typeof eventTypeSchema>;
