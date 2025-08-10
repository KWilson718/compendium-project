import registerStoreHandlers from './storeHandlers';
import registerFileHandlers from './fileHandlers';

export default function registerIPCHandlers () {
    registerStoreHandlers();
    registerFileHandlers();
}