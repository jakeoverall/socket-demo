<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
    <div v-for="item in state.items" :key="item.id">
      {{ item.name }} - {{ item.price }}
      <button @click="bid(item)">
        Bid
      </button>
    </div>
    <button @click="createItem">
      Create Item
    </button>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { socketService } from '../services/SocketService'
import { AppState } from '../AppState'
import { api } from '../services/AxiosService'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      items: computed(() => AppState.items)
    })

    onMounted(() => {
      socketService.emit('join:room', 'general')
    })

    return {
      state,
      bid(item) {
        item.price += 10
        api.put('api/values', item)
      },
      createItem() {
        api.post('api/values', {
          name: 'thing',
          price: 100
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
