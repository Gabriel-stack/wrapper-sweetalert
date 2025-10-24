import { describe, it, expect } from 'vitest';
import { ValidationErrorFormatter } from '../src/utils/ValidationErrorFormatter.js';

describe('ValidationErrorFormatter', () => {
  let formatter;

  beforeEach(() => {
    formatter = new ValidationErrorFormatter();
  });

  it('deve formatar array de erros', () => {
    const errors = ['Error 1', 'Error 2', 'Error 3'];
    const result = formatter.format(errors);
    
    expect(result).toContain('<ul');
    expect(result).toContain('Error 1');
    expect(result).toContain('Error 2');
    expect(result).toContain('Error 3');
  });

  it('deve formatar objeto de erros', () => {
    const errors = {
      field1: ['Error 1'],
      field2: ['Error 2', 'Error 3']
    };
    const result = formatter.format(errors);
    
    expect(result).toContain('<ul');
    expect(result).toContain('Error 1');
    expect(result).toContain('Error 2');
    expect(result).toContain('Error 3');
  });

  it('deve escapar HTML', () => {
    const malicious = '<script>alert("xss")</script>';
    const escaped = formatter.escapeHtml(malicious);
    
    expect(escaped).not.toContain('<script>');
    expect(escaped).toContain('&lt;script&gt;');
  });

  it('deve formatar com ícones', () => {
    const errors = ['Error 1', 'Error 2'];
    const result = formatter.formatWithIcons(errors, '⚠️');
    
    expect(result).toContain('⚠️');
    expect(result).toContain('Error 1');
    expect(result).toContain('Error 2');
  });
});
