import type { Typography, TypographyOptions } from './types';
import { defaultTypography } from './defaultTypography';
import deepmerge from 'deepmerge';

/**
 * Creates a custom typography by merging user options with the default typography
 * @param options - Custom typography options to override default typography
 * @returns A complete typography object
 */
export function createTypography(options?: TypographyOptions): Typography {
  if (!options) {
    return defaultTypography;
  }

  return deepmerge(defaultTypography, options as any) as Typography;
}
