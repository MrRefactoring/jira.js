export interface ProjectArchetype {
  realType?: 'BUSINESS' | 'SOFTWARE' | 'PRODUCT_DISCOVERY' | 'SERVICE_DESK' | 'CUSTOMER_SERVICE' | 'OPS' | string;
  style?: 'classic' | 'next-gen' | string;
  type?: 'BUSINESS' | 'SOFTWARE' | 'PRODUCT_DISCOVERY' | 'SERVICE_DESK' | 'CUSTOMER_SERVICE' | 'OPS' | string;
}
