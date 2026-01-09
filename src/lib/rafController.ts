/**
 * Singleton RAF Controller
 * Manages a single requestAnimationFrame loop for all animations
 * Prevents multiple RAF loops from running simultaneously
 */

type UpdateCallback = (time: number, delta: number) => void;

class RAFController {
  private callbacks: Map<string, UpdateCallback> = new Map();
  private rafId: number = 0;
  private lastTime: number = 0;
  private isRunning: boolean = false;

  /**
   * Register a callback to be called on each animation frame
   * @param id Unique identifier for the callback
   * @param callback Function to call on each frame (time in ms, delta in seconds)
   */
  register(id: string, callback: UpdateCallback): void {
    this.callbacks.set(id, callback);
    if (!this.isRunning && this.callbacks.size > 0) {
      this.start();
    }
  }

  /**
   * Unregister a callback
   * @param id The identifier used when registering
   */
  unregister(id: string): void {
    this.callbacks.delete(id);
    if (this.callbacks.size === 0) {
      this.stop();
    }
  }

  /**
   * Check if a callback is registered
   */
  has(id: string): boolean {
    return this.callbacks.has(id);
  }

  /**
   * Get the number of registered callbacks
   */
  get size(): number {
    return this.callbacks.size;
  }

  private start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    this.loop();
  }

  private stop(): void {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }
  }

  private loop = (): void => {
    if (!this.isRunning) return;

    const now = performance.now();
    const delta = (now - this.lastTime) / 1000; // Convert to seconds
    this.lastTime = now;

    // Call all registered callbacks
    this.callbacks.forEach((callback) => {
      try {
        callback(now, delta);
      } catch (error) {
        console.error("RAF callback error:", error);
      }
    });

    this.rafId = requestAnimationFrame(this.loop);
  };

  /**
   * Force stop all animations (useful for cleanup)
   */
  dispose(): void {
    this.stop();
    this.callbacks.clear();
  }
}

// Export singleton instance
export const rafController = new RAFController();

// Export type for callback
export type { UpdateCallback };
