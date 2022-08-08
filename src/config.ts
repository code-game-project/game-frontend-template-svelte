export default {
  /**
   * The URL of the game server this site is made for.
   * 
   * __Note:__ Please do not leave a trailing slash. (Good: `'http://localhost:8080'`, Bad: `'http://localhost:8080/'`)
   *
   * You'll likely want to change this to `''` before `npm run build`ing for production,
   * since the frontend of a game server should run on the same host and port. This allows
   * your game server and frontend to run on any host without ever having to reconfigure
   * the URL here.
   */
  gameURL: 'http://localhost:8080'
};