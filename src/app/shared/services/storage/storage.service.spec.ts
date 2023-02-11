import { InMemoryStorageRepository } from 'src/tests/repositories/in-memory-storage-repository';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let storageService: StorageService;

  beforeEach(() => {
    const storageRepository = new InMemoryStorageRepository()
    storageService = new StorageService(storageRepository)
  });

  it('should set to storage', async () => {
    const mockPerson = {
      name: 'fulano',
      age: 25
    }

    const spySetValue = jest.spyOn(storageService, 'setValue')

    await storageService.setValue({
      key: 'person',
      value: JSON.stringify(mockPerson)
    })

    expect(spySetValue).toHaveBeenCalledWith({
      key: 'person',
      value: JSON.stringify(mockPerson)
    })
  });

  it('should get value from storage', async () => {
    const mockPerson = {
      name: 'fulano',
      age: 25
    }

    await storageService.setValue({
      key: 'person',
      value: JSON.stringify(mockPerson)
    })

    const { value } = await storageService.getValue({ key: 'person' })

    const formattedValue = JSON.parse(value || '')

    expect(formattedValue).toStrictEqual(mockPerson)
  })
});
