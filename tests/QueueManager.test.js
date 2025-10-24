import { describe, it, expect } from 'vitest';
import { QueueManager } from '../src/utils/QueueManager.js';

describe('QueueManager', () => {
  it('deve criar fila vazia', () => {
    const queue = new QueueManager();
    expect(queue.size).toBe(0);
  });

  it('deve adicionar à fila e processar', async () => {
    const queue = new QueueManager();
    const result = await queue.add(() => Promise.resolve('test'));
    expect(result).toBe('test');
  });

  it('deve processar fila em ordem', async () => {
    const queue = new QueueManager();
    const results = [];
    
    queue.add(() => {
      results.push(1);
      return Promise.resolve(1);
    });
    
    queue.add(() => {
      results.push(2);
      return Promise.resolve(2);
    });
    
    queue.add(() => {
      results.push(3);
      return Promise.resolve(3);
    });

    // Aguarda processamento
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(results).toEqual([1, 2, 3]);
  });

  it('deve limpar fila', () => {
    const queue = new QueueManager();
    queue.add(() => Promise.resolve());
    queue.clear();
    expect(queue.size).toBe(0);
  });
});
