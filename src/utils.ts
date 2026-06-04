/**
 * Utility functions for form validation and data handling
 */

// Email validation regex - matches most common email formats
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

export const validateEmail = (email: string): string | null => {
  const trimmed = email.trim();
  if (!trimmed) {
    return 'Email is required';
  }
  if (!isValidEmail(trimmed)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const generateUniqueId = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for browsers without randomUUID support
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const safeJsonParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.warn('Failed to parse JSON:', error);
    return fallback;
  }
};

export const safeJsonStringify = (value: unknown): string | null => {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.warn('Failed to stringify value:', error);
    return null;
  }
};

export const safeLocalStorageGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(`Failed to get item from localStorage (key: ${key}):`, error);
    return null;
  }
};

export const safeLocalStorageSetItem = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.warn(`Failed to set item in localStorage (key: ${key}):`, error);
    return false;
  }
};

export const safeLocalStorageRemoveItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove item from localStorage (key: ${key}):`, error);
    return false;
  }
};
