import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// `output: "export"` только на `next build`: в `next dev` иначе Next не всегда
// создаёт .next/server (routes-manifest и т.д.) и сыплются ENOENT.
function nextConfig(phase: string): NextConfig {
  const isProductionBuild = phase === PHASE_PRODUCTION_BUILD;

  return {
    outputFileTracingRoot: projectRoot,
    reactStrictMode: true,
    poweredByHeader: false,
    ...(isProductionBuild ? { output: "export" as const } : {}),
    images: {
      // При статическом экспорте без Image Optimization на сервере
      unoptimized: true,
      formats: ["image/avif", "image/webp"],
    },
    experimental: {
      optimizePackageImports: ["@heroicons/react", "react-icons"],
    },
  };
}

export default nextConfig;
