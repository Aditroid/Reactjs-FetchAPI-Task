// Import Jest DOM utilities
import '@testing-library/jest-dom';

// Mock global objects that might not be available in the test environment
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};
