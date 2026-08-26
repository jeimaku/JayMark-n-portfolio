import {
  useSyncExternalStore,
} from "react";

import {
  getScrollStateSnapshot,
  subscribeToScrollState,
} from "../lib/scrollState";

export default function useScrollState() {
  return useSyncExternalStore(
    subscribeToScrollState,
    getScrollStateSnapshot,
    getScrollStateSnapshot
  );
}
