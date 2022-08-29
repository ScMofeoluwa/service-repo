export interface IWrite<T> {
  create(item: Omit<T, "_id">): Promise<T>;
  update(id: string, item: Partial<T>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
