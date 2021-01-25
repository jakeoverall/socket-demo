import { reactive, watchEffect } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  items: []
})

watchEffect(() => AppState.items.sort((a, b) => b.price > a.price))

export function addOrUpdate(arr, item) {
  const i = arr.findIndex(i => i.id === item.id)
  if (i !== -1) {
    return arr.splice(i, 1, item)
  }
  arr.push(item)
}
