export abstract class StorageRepository {
  abstract setValue(options: { key: string, value: string }): Promise<void>
  abstract getValue(options: { key: string }): Promise<{ value: string | null }>
}
