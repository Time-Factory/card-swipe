import { sql } from "~/server/db/mysql";

export type UserModel = {
  id: number;
  name: string;
  email: string;
};

export const all = async () => {
  const result = await sql({
    query: "SELECT id, name, email FROM users",
  });

  return result as UserModel[];
};

export const create = async (data: Pick<UserModel, 'name' | 'email'>) => {
  const result = (await sql({
    query: "INSERT INTO users (name, email,password) VALUES (?,?,?)",
    values: [data.name, data.email,'123456']
  })) as any;

  return result.length === 1 ? (result[0] as UserModel) : null;
};

export const detail = async (id: string) => {
  const result = (await sql({
    query: "SELECT id, name, email FROM users WHERE id = ?",
    values: [id],
  })) as any;

  return result.length === 1 ? (result[0] as UserModel) : null;
};

export const update = async (id: string, data: Pick<UserModel, "name" | "email">) => {
  await sql({
    query: "UPDATE users SET name = ?, email = ? WHERE id = ?",
    values: [data.name, data.email, id],
  })

  return await detail(id);
};

export const remove = async (id: string) => {
    await sql({
        query: 'DELETE FROM users WHERE id = ?',
        values: [id]
    })

    return true;
}