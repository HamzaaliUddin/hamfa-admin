// ============================================
// TERMS & CONDITIONS MOCK DATA
// ============================================

export type Term = {
  id: string;
  title: string;
  type: 'terms' | 'privacy' | 'refund' | 'shipping';
  description: string;
  content: string;
  version: string;
  status: 'active' | 'inactive' | 'draft';
  effectiveDate: string;
  updatedAt: string;
  createdAt: string;
};

export const terms: Term[] = [];

export default terms;

