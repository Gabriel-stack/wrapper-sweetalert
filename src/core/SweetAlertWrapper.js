import Swal from 'sweetalert2';

/**
 * SweetAlert2 Wrapper - Simplified Version
 * English API with Portuguese texts
 */
class SweetAlertWrapper {
  constructor() {
    this.defaultConfig = {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancelar',
      showCloseButton: false,
      timer: null,
      timerProgressBar: false,
    };
    this.userConfig = {};
    this.currentTheme = 'light';
  }

  /**
   * Merge configurations
   */
  mergeConfig(...configs) {
    return Object.assign({}, this.defaultConfig, this.userConfig, ...configs);
  }

  /**
   * Format error array to HTML
   */
  formatErrors(errors) {
    if (Array.isArray(errors)) {
      return `<ul style="text-align: left; margin: 0; padding-left: 20px;">${errors
        .map((error) => `<li>${this.escapeHtml(error)}</li>`)
        .join('')}</ul>`;
    }
    return this.escapeHtml(String(errors));
  }

  /**
   * Escape HTML to prevent XSS
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // === Notifications ===

  /**
   * Success alert
   */
  success(title, text = '', options = {}) {
    return Swal.fire(
      this.mergeConfig({
        icon: 'success',
        title: this.escapeHtml(title),
        text: text ? this.escapeHtml(text) : undefined,
        ...options,
      })
    );
  }

  /**
   * Error alert
   */
  error(title, text = '', options = {}) {
    return Swal.fire(
      this.mergeConfig({
        icon: 'error',
        title: this.escapeHtml(title),
        text: text ? this.escapeHtml(text) : undefined,
        ...options,
      })
    );
  }

  /**
   * Warning alert
   */
  warning(title, text = '', options = {}) {
    return Swal.fire(
      this.mergeConfig({
        icon: 'warning',
        title: this.escapeHtml(title),
        text: text ? this.escapeHtml(text) : undefined,
        ...options,
      })
    );
  }

  /**
   * Info alert
   */
  info(title, text = '', options = {}) {
    return Swal.fire(
      this.mergeConfig({
        icon: 'info',
        title: this.escapeHtml(title),
        text: text ? this.escapeHtml(text) : undefined,
        ...options,
      })
    );
  }

  /**
   * Confirm dialog
   */
  confirm(title, text = '', options = {}) {
    return Swal.fire(
      this.mergeConfig({
        icon: 'question',
        title: this.escapeHtml(title),
        text: text ? this.escapeHtml(text) : undefined,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        ...options,
      })
    );
  }

  // === Toasts ===

  /**
   * Success toast
   */
  toastSuccess(message, options = {}) {
    return Swal.fire(
      this.mergeConfig({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: this.escapeHtml(message),
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        ...options,
      })
    );
  }

  /**
   * Error toast
   */
  toastError(message, options = {}) {
    return Swal.fire(
      this.mergeConfig({
        toast: true,
        position: 'top-end',
        icon: 'error',
        title: this.escapeHtml(message),
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        ...options,
      })
    );
  }

  /**
   * Warning toast
   */
  toastWarning(message, options = {}) {
    return Swal.fire(
      this.mergeConfig({
        toast: true,
        position: 'top-end',
        icon: 'warning',
        title: this.escapeHtml(message),
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        ...options,
      })
    );
  }

  /**
   * Info toast
   */
  toastInfo(message, options = {}) {
    return Swal.fire(
      this.mergeConfig({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: this.escapeHtml(message),
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        ...options,
      })
    );
  }

  // === Extras ===

  /**
   * Multiple errors
   */
  errors(title, errors, options = {}) {
    return Swal.fire(
      this.mergeConfig({
        icon: 'error',
        title: this.escapeHtml(title),
        html: this.formatErrors(errors),
        ...options,
      })
    );
  }

  /**
   * Validation errors (Laravel style)
   */
  validationErrors(errors, options = {}) {
    const errorMessages = [];
    for (const [field, messages] of Object.entries(errors)) {
      if (Array.isArray(messages)) {
        errorMessages.push(...messages);
      } else {
        errorMessages.push(messages);
      }
    }

    return this.errors('Erros de Validação', errorMessages, options);
  }

  /**
   * Input dialog
   */
  input(title, inputType = 'text', options = {}) {
    return Swal.fire(
      this.mergeConfig({
        title: this.escapeHtml(title),
        input: inputType,
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        ...options,
      })
    );
  }

  /**
   * Loading indicator
   */
  loading(title = 'Carregando...', options = {}) {
    return Swal.fire(
      this.mergeConfig({
        title: this.escapeHtml(title),
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
        ...options,
      })
    );
  }

  /**
   * Close current alert
   */
  close() {
    Swal.close();
  }

  // === Configuration ===

  /**
   * Set global configuration
   */
  config(newConfig) {
    this.userConfig = { ...this.userConfig, ...newConfig };
  }

  /**
   * Set theme
   */
  setTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
  }

  /**
   * Custom alert
   */
  custom(options) {
    return Swal.fire(this.mergeConfig(options));
  }

  /**
   * Access to original Swal
   */
  get swal() {
    return Swal;
  }
}

export default SweetAlertWrapper;
