import { IWrite } from "../../interfaces/IWrite";
import { IRead } from "../../interfaces/IRead";
import shortid from "shortid";
import { Schema, model, Model } from "mongoose";

export abstract class BaseRepository<T> implements IRead<T>, IWrite<T> {
  public readonly _model: Model<T>;

  protected constructor(modelName: string, schema: Schema) {
    this._model = model<T>(modelName, schema);
  }

  async create(item: Omit<T, "_id">): Promise<T> {
    const _id = shortid.generate();
    const result = new this._model({ _id: _id, ...item });
    await result.save();
    return result;
  }

  async update(id: string, item: Partial<T>): Promise<boolean> {
    const result = await this._model.findByIdAndUpdate(id, { $set: item }, { new: true });
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
    // @ts-expect-error
    return result;
  }
}
