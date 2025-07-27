import { storage as memoryStorage } from './storage';

/**
 * Simplified storage factory that uses memory storage for now
 * Can be extended to use PostgreSQL when the schema is properly defined
 */
export class StorageFactory {
  private static instance: any = null;

  static async getStorage() {
    if (!this.instance) {
      // For now, always use memory storage since it's working
      this.instance = memoryStorage;
      console.log('📝 Using memory storage');
    }
    return this.instance;
  }

  static getStorageInfo() {
    return {
      type: 'Memory',
      isPostgres: false,
      note: 'PostgreSQL implementation pending proper schema definition'
    };
  }
}

export { StorageFactory as storage };
