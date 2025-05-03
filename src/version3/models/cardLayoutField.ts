/** Card layout settings of the board */
export interface CardLayoutField {
  fieldId?: string;
  id?: number;
  mode?: 'PLAN' | 'WORK' | string;
  position?: number;
}
