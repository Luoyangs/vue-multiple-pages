import { SYS } from './mutation-type'

export default {
  [SYS.ACTIVE_MENU] (state, status) {
    state.sys.menuActive = status
  }
}
