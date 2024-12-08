# pinia-study  
  
Pinia学习项目  
  
## 1 创建和使用Store  
  
### 1.1 选项式  
  
```ts  
export const useCounterStore = defineStore('counter', {  
  state: () => ({ count: 0 }),  getters: {    doubleCount: (state) => state.count * 2  },  actions: {    increment() {      this.count++    }  }})  
```  
  
### 1.2 声明式  
  
* ref() 就是 state 属性  
* computed() 就是 getters  
* function() 就是 actions  
  
```ts  
export const useCounterStore = defineStore('counter', () => {  
  const count = ref(0)  const doubleCount = computed(() => count.value * 2)  function increment() {    return count.value++  }  return {    count,    doubleCount,    increment  }})  
```  
  
### 1.3 使用Store  
  
#### 错误示例  
  
> 直接解构获取 state 和 getters 是错误的, 会失去`响应式`特性  
  
```vue  
<script setup lang="ts">  
  
import { useCounterStore } from './stores/useCounterStore'  
  
const counterStore = useCounterStore()  
const { count, doubleCount, increment } = counterStore  
  
</script>  
  
<template>  
  <div>hello world</div>  <div>{{ count }}</div>  <div>{{ doubleCount }}</div>  <!-- 通过input修改count, 将不会按照预期修改成功 -->  <input v-model="count" />  <button @click="increment">无明增长</button>  
</template>  
  
<style scoped></style>  
```  
  
#### 正确姿势  
  
```vue  
<script setup lang="ts">  
  
import { useCounterStore } from './stores/useCounterStore'  
import { storeToRefs } from 'pinia'  
  
const counterStore = useCounterStore()  
const { count, doubleCount } = storeToRefs(counterStore)  
// action 可以直接解构, 没有问题  
const { increment } = counterStore  
</script>  
  
<template>  
  <div>hello world</div>  <div>{{ count }}</div>  <div>{{ doubleCount }}</div>  <input v-model="count" />  <button @click="increment">无明增长</button>  
</template>  
  
<style scoped></style>  
```  
  
## 2 定义和使用State  
### 2.1 定义State  
```typescript  
// 定义类型帮助推断  
interface UserInfo {  
  id: number,  name: string}  
  
export const useStateStore1 = defineStore('state1', {  
  // 注意: 这里使用箭头函数保证完整推断  
  state: () => {    return {      // 所有这些属性都将自动推断出它们的类型  
      count: 0,      name: 'intro',      isAdmin: true,      items: [] as object[],      hasChanged: true,      userList: [] as UserInfo[]    }  }})  
  
// 定义state的接口定义  
interface State {  
  count: number,  name: string,  isAdmin: boolean,  items: object[],  hasChanged: boolean,  userList: UserInfo[]}  
  
export const useStateStore2 = defineStore('state2', {  
  // 注意: 这里使用箭头函数保证完整推断  
  state: (): State => {    return {      // 所有这些属性都将自动推断出它们的类型  
      count: 0,      name: 'intro',      isAdmin: true,      items: [],      hasChanged: true,      userList: []    }  }})  
  
// 声明式写法  
export const useStateStore3 = defineStore('state3', () => {  
  const count = ref(0)  const name = ref('intro')  const isAdmin = ref(true)  const items = reactive<object[]>([])  const hasChanged = ref(true)  const userList = reactive<UserInfo[]>([])  return {    count,    name,    isAdmin,    items,    hasChanged,    userList  }})  
```  
  
### 2.2 使用State  
  
在声明式的 vue 组件中使用  
```vue  
<script setup lang="ts">  
import { useStateStore1, useStateStore2, useStateStore3 } from '@/stores/useStateStore'  
import { storeToRefs } from 'pinia'  
  
const stateStore1 = useStateStore1()  
const stateStore2 = useStateStore2()  
const stateStore3 = useStateStore3()  
const {  
  count: count1,  name: name1,  isAdmin: isAdmin1,  items: items1,  hasChanged: hasChanged1,  userList: userList1} = storeToRefs(stateStore1)  
const {  
  count: count2,  name: name2,  isAdmin: isAdmin2,  items: items2,  hasChanged: hasChanged2,  userList: userList2} = storeToRefs(stateStore2)  
const {  
  count: count3,  name: name3,  isAdmin: isAdmin3,  items: items3,  hasChanged: hasChanged3,  userList: userList3} = storeToRefs(stateStore3)  
  
</script>  
  
<template>  
  <p>    store1: <br/>    {{count1}}    {{name1}}    {{isAdmin1}}    {{items1}}    {{hasChanged1}}    {{userList1}}  </p>  <p>    store2: <br/>    {{count2}}    {{name2}}    {{isAdmin2}}    {{items2}}    {{hasChanged2}}    {{userList2}}  </p>  <p>    store3: <br/>    {{count3}}    {{name3}}    {{isAdmin3}}    {{items3}}    {{hasChanged3}}    {{userList3}}  </p></template>  
```  
  
在选项式中使用state, mapState映射为只读计算属性, mapWritableState映射为可写的计算属性。  
```vue  
<script lang="ts">  
  import { defineComponent } from 'vue'  import { mapState, mapWritableState } from 'pinia'  import { useStateStore1, useStateStore2 } from '@/stores/useStateStore'  
  export default defineComponent({    name: 'UseStateOptions',    computed: {      // 映射为只读的计算属性  
      ...mapState(useStateStore1, ['count', 'name', 'isAdmin']),      ...mapState(useStateStore1, {        items: store => store.items,        hasChanged: store => store.hasChanged      }),      // 映射为可写的计算属性 但是这里不支持函数的写法store => store.count  
      ...mapWritableState(useStateStore2, {        count2: 'count'      })    }  })</script>  
  
<template>  
  <p>    store1:    {{ count }}    {{ name }}    {{ isAdmin }}    {{ items }}    {{ hasChanged }}  </p>  <br/>  <p>    store2:    {{ count2 }}  </p>  <!-- count1增加无效, count2可以增加 -->  <button @click="count++">count1增加</button>  
  <button @click="count2++">count2增加</button>  
</template>  
```  
  
## 3 使用Getter  
  
## 4 使用Action