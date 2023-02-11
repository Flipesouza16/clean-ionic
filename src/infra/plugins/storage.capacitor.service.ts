import { Preferences } from "@capacitor/preferences";
import { StorageRepository } from "src/app/repositories/storage-repository";

export class StorageCapacitorService implements StorageRepository {

  async setValue(options: { key: string; value: string; }): Promise<void> {
    const { key, value } = options

    await Preferences.set({
      key,
      value
    })
  }

  async getValue(options: { key: string; }): Promise<{ value: string | null }> {
    const { key } = options

    const { value } = await Preferences.get({
      key
    })

    return { value }
  }
}
