import { StorageRepository } from "src/app/repositories/storage-repository"

type StorageValue = {
  [key: string]: string
}

export class InMemoryStorageRepository implements StorageRepository {
  private _storageValue: StorageValue = {};

  async setValue(options: { key: string; value: string; }): Promise<void> {
    const { key, value } = options

    this._storageValue[key] = value
  }

  async getValue(options: { key: string; }): Promise<{ value: string | null; }> {
    const { key } = options

    const value = this._storageValue[key]

    return { value }
  }
}
