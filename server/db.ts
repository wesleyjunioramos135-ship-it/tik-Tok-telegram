import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, bridgeLinks, BridgeLink, InsertBridgeLink } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getBridgeLinkBySlug(slug: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bridge link: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(bridgeLinks)
    .where(eq(bridgeLinks.slug, slug))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllBridgeLinks() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get bridge links: database not available");
    return [];
  }

  return await db.select().from(bridgeLinks).orderBy(bridgeLinks.createdAt);
}

export async function createBridgeLink(data: InsertBridgeLink) {
  const db = await getDb();
  if (!db) {
    throw new Error("[Database] Cannot create bridge link: database not available");
  }

  const result = await db.insert(bridgeLinks).values(data);
  return result;
}

export async function updateBridgeLink(
  id: number,
  data: Partial<InsertBridgeLink>
) {
  const db = await getDb();
  if (!db) {
    throw new Error("[Database] Cannot update bridge link: database not available");
  }

  await db.update(bridgeLinks).set(data).where(eq(bridgeLinks.id, id));
}

export async function deleteBridgeLink(id: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("[Database] Cannot delete bridge link: database not available");
  }

  await db.delete(bridgeLinks).where(eq(bridgeLinks.id, id));
}

export async function toggleBridgeLinkStatus(id: number, isActive: boolean) {
  const db = await getDb();
  if (!db) {
    throw new Error("[Database] Cannot toggle bridge link: database not available");
  }

  await db
    .update(bridgeLinks)
    .set({ isActive: isActive ? 1 : 0 })
    .where(eq(bridgeLinks.id, id));
}
