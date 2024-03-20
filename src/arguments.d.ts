import type { OptionValues } from "commander";

export interface Arguments extends OptionValues {
  branch: string;
  dist: string;
  remote: string;
  message: string;
  silent: boolean;
  nojekyll: boolean;
}
