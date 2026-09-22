"use client";

import { Component, type ReactNode } from "react";
import { Html } from "@react-three/drei";

export function SceneLoading() {
  return (
    <Html center>
      <p role="status" className="whitespace-nowrap rounded-md bg-black/80 px-4 py-3 font-mono text-sm text-emerald-300">
        Loading 3D portfolio…
      </p>
    </Html>
  );
}

export function SceneUnavailable({ unsupported = false }: { unsupported?: boolean }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-black p-6 text-center text-white">
      <div role="alert" className="max-w-sm">
        <h1 className="text-lg font-semibold">
          {unsupported ? "3D graphics are unavailable" : "The 3D scene couldn’t load"}
        </h1>
        <p className="mt-2 text-sm text-white/70">
          {unsupported
            ? "Try a browser with WebGL enabled and check hardware acceleration."
            : "Check your connection and try loading the portfolio again."}
        </p>
        <button
          type="button"
          className="mt-4 rounded border border-emerald-300 px-4 py-2 text-emerald-300"
          onClick={() => window.location.reload()}
        >
          Reload portfolio
        </button>
      </div>
    </div>
  );
}

export class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <SceneUnavailable /> : this.props.children;
  }
}
