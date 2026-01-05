import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster?: string;
  country?: string;
  year?: number;
};

type CreateProgram = Omit<Program, "id">;

class ProgramRepository {
  async readAll(): Promise<Program[]> {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM program");
    return rows as Program[];
  }

  async read(id: number): Promise<Program | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM program WHERE id = ?",
      [id],
    );
    return (rows as Program[])[0] ?? null;
  }

  async create(program: CreateProgram): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO program (title, synopsis, poster, country, year) VALUES (?, ?, ?, ?, ?)",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
      ],
    );
    return result.insertId;
  }

  async update(id: number, program: CreateProgram): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "UPDATE program SET title = ?, synopsis = ?, poster = ?, country = ?, year = ? WHERE id = ?",
      [
        program.title,
        program.synopsis,
        program.poster,
        program.country,
        program.year,
        id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id: number): Promise<number> {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM program WHERE id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new ProgramRepository();
