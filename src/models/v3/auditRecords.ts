import { AuditRecordBean } from './auditRecordBean';

export interface AuditRecords {
  offset: number;
  limit: number;
  total: number;
  records: AuditRecordBean[];
}
