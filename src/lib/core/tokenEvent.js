
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

export const TOKEN_STORAGE_GET_ERR = `${evtNameScope}storage:err:get`;
export const TOKEN_STORAGE_SET_ERR = `${evtNameScope}storage:err:set`;

export const TOKEN_WX_BEFORE_LOGIN = `${evtNameScope}wx:beforeLogin`;
export const TOKEN_WX_SUCCESS_LOGIN = `${evtNameScope}wx:successLogin`;
export const TOKEN_WX_FAIL_LOGIN = `${evtNameScope}wx:failLogin`;
export const TOKEN_WX_BEFORE_REQUEST = `${evtNameScope}wx:beforeRequest`;
export const TOKEN_WX_SUCCESS_REQUEST = `${evtNameScope}wx:successRequest`;
export const TOKEN_WX_FAIL_REQUEST = `${evtNameScope}wx:failRequest`;

export const TOKEN_ALI_BEFORE_LOGIN = `${evtNameScope}ali:beforeLogin`;
export const TOKEN_ALI_SUCCESS_LOGIN = `${evtNameScope}ali:successLogin`;
export const TOKEN_ALI_FAIL_LOGIN = `${evtNameScope}ali:failLogin`;
export const TOKEN_ALI_BEFORE_REQUEST = `${evtNameScope}ali:beforeRequest`;
export const TOKEN_ALI_SUCCESS_REQUEST = `${evtNameScope}ali:successRequest`;
export const TOKEN_ALI_FAIL_REQUEST = `${evtNameScope}ali:failRequest`;
