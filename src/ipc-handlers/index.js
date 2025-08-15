import registerStoreHandlers from './storeHandlers';
import registerFileHandlers from './fileHandlers';

// Groups together other ipc handler collections to serve them all together in a single function
export default function registerIPCHandlers () {
    registerStoreHandlers();
    registerFileHandlers();
}