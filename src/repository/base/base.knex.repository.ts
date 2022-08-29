import { IWrite } from "../../entities/IWrite";
import { IRead } from "../../entities/IRead";
import { DBService } from "../../database/database";
import { container } from "../../inversify.config";
import type { Knex } from "knex";
import shortid from "shortid";

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
  public dbInstance = container.get(DBService);
  public db: Knex = this.dbInstance.knexConnect();

  protected constructor(public readonly tableName: string) {}

  public get _model(): Knex.QueryBuilder {
    return this.db(this.tableName);
  }

  async create(item: Omit<T, "_id">): Promise<T> {
    //@ts-expect-error
    item._id = shortid.generate();
    const [result] = await this._model.insert(item).returning("*");
    return result as Promise<T>;
  }

  async update(id: string, item: Partial<T>): Promise<boolean> {
    const result = await this._model.where("_id", id).update(item);
    return !!result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this._model.where("_id", id).del();
    return !!result;
  }

  async find(): Promise<T[]> {
    const result = await this._model.select();
    return result;
  }

  async findOne(id: string): Promise<T> {
    const result = await this._model.where("_id", id).first();
    return result;
  }
}
