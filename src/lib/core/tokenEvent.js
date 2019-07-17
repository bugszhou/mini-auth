
const evtNameScope = 'MINI_AUTH:token:';

export const TOKEN_BEFORE_REFRESH = `${evtNameScope}beforeRefresh`;
export const TOKEN_AFTER_REFRESH = `${evtNameScope}afterRefresh`;
export const TOKEN_BEFORE_CACHE = `${evtNameScope}beforeCache`;
export const TOKEN_AFTER_CACHE = `${evtNameScope}afterCache`;
export const TOKEN_EXPIRED = `${evtNameScope}expired`;
export const TOKEN_BEFORE_LOGIN = `${evtNameScope}beforeLogin`;
export const TOKEN_AFTER_LOGIN = `${evtNameScope}afterLogin`;
export const TOKEN_BEFORE_REQUEST = `${evtNameScope}beforeRequest`;
export const TOKEN_AFTER_REQUEST = `${evtNameScope}afterRequest`;
