import { writable, type Writable } from "svelte/store";
import { api } from "@code-game-project/client";
import config from "./config";

export const gameName = writable('N/A');
export const gameVersion = writable('N/A');
export const gameDescription = writable('N/A');
export const cgVersion = writable('N/A');
export const repoUrl = writable('');

export const initInfo = async () => {
  const info = await api.getInfo(window.fetch, config.gameURL);
  if (info.ok && info.data) {
    const {
      name,
      cg_version,
      display_name,
      description,
      version,
      repository_url,
    } = info.data;
    gameName.set(display_name || name);
    if (version) gameVersion.set(version);
    if (description) gameDescription.set(description);
    cgVersion.set(cg_version);
    if (repository_url) repoUrl.set(repository_url);
  }
};

export const errors: Writable<string[]> = writable([]);
export const addError = (message: string) => {
  errors.update((errors) => {
    errors.push(message);
    return errors;
  });
};
export const dismissError = (index: number) => {
  errors.update((errors) => {
    errors.splice(index, 1);
    return errors;
  });
};
