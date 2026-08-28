import { MediaWikiClient } from "./MediaWikiClient";

/**
 * Convenience wrapper around several named `MediaWikiClient` instances with a single mutable
 * "current wiki" pointer — for consumers (e.g. mw-cli) that want `setWiki()` semantics instead
 * of threading a specific client instance through their own code.
 */
export class MediaWikiClientRegistry {
  /** Registered clients, keyed by the name passed to {@link register}. */
  private readonly clients = new Map<string, MediaWikiClient>();
  /** Name of the currently-selected client, or `undefined` if none has been registered/selected yet. */
  private currentName?: string;

  /**
   * Registers a client under `name`. The first client ever registered becomes current automatically.
   * @param name Arbitrary identifier used to refer to this wiki elsewhere in the registry.
   * @param client The {@link MediaWikiClient} instance to register.
   * @returns `this`, for chaining.
   */
  register(name: string, client: MediaWikiClient): this {
    this.clients.set(name, client);
    this.currentName ??= name;
    return this;
  }

  /**
   * Makes the client registered under `name` the current one.
   * @param name A name previously passed to {@link register}.
   * @returns `this`, for chaining.
   * @throws {Error} If no client is registered under `name`.
   */
  setWiki(name: string): this {
    this.get(name); // throws if unregistered
    this.currentName = name;
    return this;
  }

  /**
   * Sets and returns the newly-current client in one call.
   * @param name A name previously passed to {@link register}.
   * @returns The now-current {@link MediaWikiClient}.
   */
  use(name: string): MediaWikiClient {
    this.setWiki(name);
    return this.current;
  }

  /**
   * Looks up a registered client by name without changing which one is current.
   * @param name A name previously passed to {@link register}.
   * @throws {Error} If no client is registered under `name`.
   */
  get(name: string): MediaWikiClient {
    const client = this.clients.get(name);
    if (!client) {
      throw new Error(`No wiki registered under name "${name}"`);
    }
    return client;
  }

  /**
   * The client selected via {@link register}/{@link setWiki}/{@link use}.
   * @throws {Error} If no client has been registered yet.
   */
  get current(): MediaWikiClient {
    if (!this.currentName) {
      throw new Error("No current wiki set — call register()/setWiki() first");
    }
    return this.get(this.currentName);
  }
}
