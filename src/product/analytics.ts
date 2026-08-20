export type ProductEvent =
  | { name: 'company_searched'; properties: { queryLength: number; resultCount: number } }
  | { name: 'company_opened'; properties: { companyId: string; source: 'table' | 'map' | 'saved' | 'decision' } }
  | { name: 'company_tab_opened'; properties: { companyId: string; tab: string } }
  | { name: 'explainer_requested'; properties: { companyId: string; focus: string } }
  | { name: 'company_saved'; properties: { companyId: string; saved: boolean } }
  | { name: 'workspace_created'; properties: { source: string } }
  | { name: 'decision_lens_changed'; properties: { lens: 'balanced' | 'growth' | 'risk' | 'security' } }
  | { name: 'decision_segment_changed'; properties: { segment: 'all' | 'verified' | 'enterprise' | 'scaleup' } }
  | { name: 'decision_view_saved'; properties: { lens: 'balanced' | 'growth' | 'risk' | 'security'; segment: 'all' | 'verified' | 'enterprise' | 'scaleup' } }
  | { name: 'experiment_reviewed'; properties: { experimentId: string } };

export interface AnalyticsPort {
  track(event: ProductEvent): void;
}

export class ConsoleAnalytics implements AnalyticsPort {
  constructor(private readonly enabled = import.meta.env.DEV) {}

  track(event: ProductEvent): void {
    if (this.enabled) console.info('[product-event]', event);
  }
}

export const analytics: AnalyticsPort = new ConsoleAnalytics();
