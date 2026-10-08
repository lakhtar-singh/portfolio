import { lazy } from 'react'

/** Every live demo, loaded on demand. Shared by both page designs. */
export const demos = {
  tenant: lazy(() => import('./TenantDemo')),
  stock: lazy(() => import('./StockDemo')),
  press: lazy(() => import('./PressDemo')),
  pipeline: lazy(() => import('./PipelineDemo')),
  ship: lazy(() => import('./ShipDemo')),
  inbox: lazy(() => import('./InboxDemo')),
  sort: lazy(() => import('./SortDemo')),
  pulse: lazy(() => import('./PulseDemo')),
  atlas: lazy(() => import('./AtlasDemo')),
  contrast: lazy(() => import('./ContrastDemo')),
  headless: lazy(() => import('./HeadlessDemo')),
}
