import mockData from '@/data/mock-db.json';
import type { MockDatabase } from '../types/schema';

export function useMockData(): MockDatabase {
  return mockData as unknown as MockDatabase;
}
