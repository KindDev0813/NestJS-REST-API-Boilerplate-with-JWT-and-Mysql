import * as path from 'path';
import * as fs from 'fs';
import * as appRoot from 'app-root-path';
import * as dotenv from 'dotenv';

dotenv.config();

// ensure log directory exists
const logDirectory = path.resolve(`${appRoot}`, process.env.LOGGING_DIR);
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const options = {
  infoFile: {
    level: 'info',
    filename: path.resolve(logDirectory, process.env.INFO_LOG_PATH),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
  errorFile: {
    level: 'error',
    filename: path.resolve(logDirectory, process.env.ERROR_LOG_PATH),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  },
};

export default options;
