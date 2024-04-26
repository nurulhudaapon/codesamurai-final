"use client";


globalThis.console = new EcosyncLogger({ name: "Web" }).init();

export function Logger({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
