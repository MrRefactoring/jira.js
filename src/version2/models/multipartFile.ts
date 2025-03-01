import { Resource } from './resource';

export interface MultipartFile {
  bytes?: string[];
  contentType?: string;
  empty?: boolean;
  inputStream?: {};
  name?: string;
  originalFilename?: string;
  resource?: Resource;
  size?: number;
}
