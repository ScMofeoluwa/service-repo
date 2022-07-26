import { IWrite } from "../../interfaces/IWrite";
import { IRead } from "../../interfaces/IRead";

import { Schema, model, Model } from "mongoose";

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
  public readonly _model: Model<T>;

  constructor(modelName: string, schema: Schema) {
    this._model = model<T>(modelName, schema);
  }

  async create(item: T): Promise<T> {
    const result = await this._model.create(item);
    return result;
  }

  async update(id: string, item: T): Promise<boolean> {
    const result = await this._model.findByIdAndUpdate(id, { $set: item });
    return !!result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this._model.findByIdAndDelete(id);
    return !!result;
  }

  async find(): Promise<T[]> {
    const result = await this._model.find();
    return result;
  }

  async findOne(id: string): Promise<T> {
    const result = await this._model.findById(id);
    // @ts-ignore
    return result;
  }
}
