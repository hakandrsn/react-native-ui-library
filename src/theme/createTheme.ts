import type { Theme, ThemeOptions } from './types';
import { defaultTheme } from './defaultTheme';
import deepmerge from 'deepmerge';

/**
 * Creates a custom theme by merging user options with the default theme
 * @param options - Custom theme options to override default theme
 * @returns A complete theme object
 */
export function createTheme(options?: ThemeOptions): Theme {
  if (!options) {
    return defaultTheme;
  }

  return deepmerge(defaultTheme, options as any) as Theme;
}
