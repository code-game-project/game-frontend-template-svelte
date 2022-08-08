import config from "./config";

/** The result of an accessor function */
export interface Res<Data> { ok: boolean, data?: Data, networkError?: boolean; };

export interface Error { message: string; };

/**
 * @route GET `/info`
 * @returns `Promise` of possible API responses
 */
export async function getInfo(): Promise<Res<{ name: string, cg_version: string, display_name?: string, description?: string, version?: string, repository_url?: string; }>> {
  try {
    const r = await fetch(`${config.gameURL}/api/info`, { method: "GET" });
    try {
      return { ok: r.ok, data: await r.json() };
    } catch (e) {
      return { ok: r.ok };
    }
  } catch (e) {
    console.error(e);
    return { ok: false, networkError: true };
  }
}

/**
 * @route GET `/games`
 * @returns `Promise` of possible API responses
 */
export async function getGames(): Promise<Res<{ private: number, public: { id: string, players: number; }[]; }>> {
  try {
    const r = await fetch(`${config.gameURL}/api/games`, { method: "GET" });
    try {
      return { ok: r.ok, data: await r.json() };
    } catch (e) {
      return { ok: r.ok };
    }
  } catch (e) {
    console.error(e);
    return { ok: false, networkError: true };
  }
}

/**
 * @route GET `/games/{game_id}`
 * @returns `Promise` of possible API responses
 */
export async function getGame(path: { game_id: string; }): Promise<Res<{ id: string, players: number, config?: object; }>> {
  try {
    const r = await fetch(`${config.gameURL}/api/games/${path.game_id}`, { method: "GET" });
    try {
      return { ok: r.ok, data: await r.json() };
    } catch (e) {
      return { ok: r.ok };
    }
  } catch (e) {
    console.error(e);
    return { ok: false, networkError: true };
  }
}
