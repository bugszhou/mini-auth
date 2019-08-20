
export default function emitEvt(self, evtName = 'noName', data = {}) {
  if (self && typeof self.emit === 'function') {
    self.emit(evtName, data);
  }
}
