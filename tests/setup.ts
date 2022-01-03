import * as dotenv from 'dotenv';
import { Constants } from './integration';

dotenv.config();

jest.setTimeout(Constants.testTimeouts);

