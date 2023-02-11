import { Injectable } from '@angular/core';
import { StorageRepository } from 'src/app/repositories/storage-repository';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements StorageRepository {

  constructor(private storageRepository: StorageRepository) { }

  async getValue(options: { key: string; }): Promise<{ value: string | null }> {
    const { key } = options
    const { value } = await this.storageRepository.getValue({ key })
    return { value }
  }

  async setValue(options: { key: string; value: string; }): Promise<void> {
    const { key, value } = options
    await this.storageRepository.setValue({ key, value })
  }
}
