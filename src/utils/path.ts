import { dirname } from "path";
import { fileURLToPath } from "url";

const getDirName = (url: string): string => dirname(fileURLToPath(url));

export default getDirName;
