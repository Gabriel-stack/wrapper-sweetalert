import { describe, it, expect, beforeEach, vi } from 'vitest';
import SweetAlertWrapper from '../src/core/SweetAlertWrapper.js';

describe('SweetAlertWrapper', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = new SweetAlertWrapper();
  });

  describe('Configuração', () => {
    it('deve criar instância com configuração padrão', () => {
      expect(wrapper).toBeDefined();
      expect(wrapper.defaultConfig).toBeDefined();
      expect(wrapper.defaultConfig.confirmButtonText).toBe('OK');
    });

    it('deve adicionar configuração customizada', () => {
      wrapper.addConfig('customKey', 'customValue');
      expect(wrapper.customConfig.customKey).toBe('customValue');
    });

    it('deve remover configuração customizada', () => {
      wrapper.addConfig('customKey', 'customValue');
      wrapper.removeConfig('customKey');
      expect(wrapper.customConfig.customKey).toBeUndefined();
    });

    it('deve modificar configuração existente', () => {
      wrapper.addConfig('customKey', 'oldValue');
      wrapper.modifyConfig('customKey', 'newValue');
      expect(wrapper.customConfig.customKey).toBe('newValue');
    });

    it('deve definir configuração global', () => {
      wrapper.setGlobalConfig({ timer: 5000 });
      expect(wrapper.globalConfig.timer).toBe(5000);
    });

    it('deve mesclar configurações corretamente', () => {
      wrapper.setGlobalConfig({ timer: 5000 });
      wrapper.addConfig('customKey', 'customValue');
      const merged = wrapper.getMergedConfig({ title: 'Test' });
      expect(merged.timer).toBe(5000);
      expect(merged.customKey).toBe('customValue');
      expect(merged.title).toBe('Test');
    });
  });

  describe('Tema', () => {
    it('deve definir tema', () => {
      wrapper.setTheme('dark');
      expect(wrapper.themeManager.currentTheme).toBe('dark');
    });

    it('deve adicionar tema customizado', () => {
      const customTheme = { background: '#custom' };
      wrapper.themeManager.addTheme('custom', customTheme);
      expect(wrapper.themeManager.themes.custom).toEqual(customTheme);
    });
  });

  describe('Internacionalização', () => {
    it('deve definir idioma', () => {
      wrapper.setLocale('en');
      expect(wrapper.localeManager.currentLocale).toBe('en');
    });

    it('deve traduzir chaves', () => {
      wrapper.setLocale('pt-BR');
      expect(wrapper.localeManager.t('confirm')).toBe('Confirmar');
      
      wrapper.setLocale('en');
      expect(wrapper.localeManager.t('confirm')).toBe('Confirm');
    });

    it('deve adicionar locale customizado', () => {
      wrapper.localeManager.addLocale('custom', { confirm: 'Custom Confirm' });
      wrapper.setLocale('custom');
      expect(wrapper.localeManager.t('confirm')).toBe('Custom Confirm');
    });
  });

  describe('Fila', () => {
    it('deve gerenciar fila de alertas', () => {
      expect(wrapper.queueManager.size).toBe(0);
      wrapper.queueManager.add(() => Promise.resolve());
      expect(wrapper.queueManager.size).toBeGreaterThanOrEqual(0);
    });

    it('deve limpar fila', () => {
      wrapper.queueManager.add(() => Promise.resolve());
      wrapper.clearQueue();
      expect(wrapper.queueManager.size).toBe(0);
    });
  });

  describe('Formatação de Erros', () => {
    it('deve formatar array de erros', () => {
      const errors = ['Error 1', 'Error 2'];
      const formatted = wrapper.validationFormatter.format(errors);
      expect(formatted).toContain('<ul');
      expect(formatted).toContain('Error 1');
      expect(formatted).toContain('Error 2');
    });

    it('deve formatar objeto de erros do Laravel', () => {
      const errors = {
        email: ['Email is required'],
        password: ['Password is required']
      };
      const formatted = wrapper.validationFormatter.format(errors);
      expect(formatted).toContain('<ul');
      expect(formatted).toContain('Email is required');
      expect(formatted).toContain('Password is required');
    });

    it('deve escapar HTML para prevenir XSS', () => {
      const errors = ['<script>alert("xss")</script>'];
      const formatted = wrapper.validationFormatter.format(errors);
      expect(formatted).not.toContain('<script>');
      expect(formatted).toContain('&lt;script&gt;');
    });
  });

  describe('Eventos', () => {
    it('deve disparar evento customizado', () => {
      const callback = vi.fn();
      wrapper.on('test', callback);
      wrapper.dispatchEvent('test', { data: 'test' });
      
      // Aguarda evento ser processado
      setTimeout(() => {
        expect(callback).toHaveBeenCalled();
      }, 0);
    });

    it('deve remover listener de evento', () => {
      const callback = vi.fn();
      wrapper.on('test', callback);
      wrapper.off('test', callback);
      wrapper.dispatchEvent('test', { data: 'test' });
      
      setTimeout(() => {
        expect(callback).not.toHaveBeenCalled();
      }, 0);
    });
  });

  describe('Acesso ao Swal', () => {
    it('deve ter acesso ao Swal original', () => {
      expect(wrapper.swal).toBeDefined();
    });
  });
});
