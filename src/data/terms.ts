// ============================================
// TERMS & CONDITIONS TYPES - Matching Backend Models
// ============================================

export type TermType = 'terms' | 'privacy' | 'refund' | 'shipping';
export type TermStatus = 'active' | 'inactive' | 'draft';

export type Term = {
  term_id: number;
  title: string;
  type: TermType;
  description: string;
  content: string;
  version: string;
  status: TermStatus;
  effective_date: string;
  created_at?: string;
  updated_at?: string;
};

export const terms: Term[] = [];

export default terms;
