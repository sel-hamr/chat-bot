"use server";

import { ObjectId } from "mongodb";

import { getDb } from "@/lib/mongo";

export const checkUserExists = async (userId: string | null | undefined) => {
  if (!userId) {
    return false;
  }

  const db = await getDb();
  const users = db.collection("chat-bot");

  const query = ObjectId.isValid(userId)
    ? { _id: new ObjectId(userId) }
    : { userId };

  const doc = await users.findOne(query, { projection: { _id: 1 } });
  return doc !== null;
};
