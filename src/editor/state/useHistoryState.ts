import { defineComponent, onUnmounted, reactive } from "@vue/composition-api";

export function useHistoryState() {
  const thatData = reactive({
    EditorHistory: [],
    index: -1, //未初始化
    maxLength: 50, //最大50个步骤
  });

  const getPrev = function(): {} {
    const prev = thatData.index - 1;
    const prevData = thatData.EditorHistory[prev];
    if (prevData) {
      thatData.index = prev;
      return prevData;
    }
    return null;
  };

  const getNext = function(): {} {
    const next = thatData.index + 1;
    const nextData = thatData.EditorHistory[next];
    if (nextData) {
      thatData.index = next;
      return nextData;
    }
    return null;
  };

  const add = function(data) {
    if (!data) return;
    const index = thatData.index;
    let startIndex = 0;
    let length = thatData.EditorHistory.length;
    if (!(index == length - 1) && length < thatData.maxLength) {
      startIndex = Math.max(index + 2 - thatData.maxLength, 0);
      thatData.EditorHistory = thatData.EditorHistory.slice(
        startIndex,
        index + 1
      );
    }
    thatData.EditorHistory.push(data);
    thatData.index = thatData.EditorHistory.length - 1;
  };

  return {
    getPrev,
    getNext,
    add,
  };
}