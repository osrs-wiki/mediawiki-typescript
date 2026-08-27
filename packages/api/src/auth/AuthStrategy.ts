import type { AxiosInstance } from "axios";
import type { MediaWikiClient } from "../client/MediaWikiClient";

/**
 * Pluggable authentication mechanism attached to a `MediaWikiClient` instance.
 * Implementations wire cookie jars / request signing onto the client's axios instance and,
 * optionally, perform a one-time handshake (e.g. `clientlogin`) before privileged calls.
 */
export interface AuthStrategy {
  /**
   * Wires cookie jars / interceptors onto the client's axios instance; called once at construction.
   * @param axiosInstance The client's underlying axios instance to configure.
   */
  attach(axiosInstance: AxiosInstance): void;
  /** Whether privileged (write) calls need a CSRF token appended — true for cookie-based auth, false for OAuth. */
  requiresCsrfToken(): boolean;
  /**
   * Performs any handshake needed before privileged calls (e.g. clientlogin); omit for stateless auth.
   * @param client The owning client, usable to issue the handshake's own Action API calls.
   */
  login?(client: MediaWikiClient): Promise<void>;
}
