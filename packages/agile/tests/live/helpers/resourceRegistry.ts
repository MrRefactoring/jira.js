export interface RegisteredResource {
  kind: string;
  id: string;
  delete: () => Promise<void>;
}

export class ResourceRegistry {
  private readonly stack: RegisteredResource[] = [];

  register(resource: RegisteredResource): void {
    this.stack.push(resource);
  }

  size(): number {
    return this.stack.length;
  }

  async cleanup(): Promise<void> {
    while (this.stack.length > 0) {
      const resource = this.stack.pop()!;
      try {
        await resource.delete();
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`[live-tests] cleanup failed for ${resource.kind}#${resource.id}: ${message}`);
      }
    }
  }
}
