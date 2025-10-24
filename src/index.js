import SweetAlertWrapper from './core/SweetAlertWrapper.js';
import './themes/default.css';

// Create default instance
const sweetAlert = new SweetAlertWrapper();

// Shortcuts
export default sweetAlert;
export { SweetAlertWrapper };

// Global browser access
if (typeof window !== 'undefined') {
  window.sweetAlert = sweetAlert;
  window.SweetAlert = sweetAlert; // Compatibility
  window.SweetAlertWrapper = SweetAlertWrapper;
}
