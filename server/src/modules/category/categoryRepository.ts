import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

type CreateCategory = Omit<Category, "id">;

class CategoryRepository {
  async readAll(): Promise<Category[]> {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM category");
    return rows as Category[];
  }

  async read(id: number): Promise<Category | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM category WHERE id = ?",
      [id],
    );
    return (rows as Category[])[0] ?? null;
  }

  async create(category: CreateCategory): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO category (name) VALUES (?)",
      [category.name],
    );
    return result.insertId;
  }

  async update(id: number, category: CreateCategory): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE category SET name = ? WHERE id = ?",
      [category.name, id],
    );
    return result.affectedRows;
  }

  async delete(id: number): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM category WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new CategoryRepository();
