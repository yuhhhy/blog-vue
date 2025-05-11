# 什么是响应式数据
什么是响应式数据？一般而言，运行在 JavaScript 中的代码并不会有响应式，比如下面这个例子

```js
let price = 5
let count = 8
let sell = price * count

console.log(sell) // 40

price = 10
console.log(sell) // 40
```

很显然，这里是没有响应式的，因为当数据(price)改变的时候，依赖数据的的视图(sell)并没有发生改变。

同样，如果没有响应式，那么在 Vue 里面，当数据更新的时候，视图里的{{ sell }}也就不会更新，但是实际情况并非如此。那么 Vue 是如何做到响应式的呢？

```js
// script
let sell = ref(40)
onMonted(() => { sell.value = 80 })

// template
<div>Price: {{ sell }}</div>
```

# 如何实现响应式

- 让我们把 `price` 看作一个响应式的数据，那么我们的代码应该会根据 `price` 的变化来动态地更新 `sell`。
- 我们定义一个 `effect` 函数，它会在响应式数据更新的时候执行。一个 effect 就对应着一处需要用到响应式数据的地方，一个需要被更新的“视图”

```js
let price = 5
let count = 8
let sell = 0

let effect = () => { sell = price*count }


effect() // 初始化sell

price = 10
effect() // 更新sell
```
但是这样每次数据更新时，都需要我们手动触发 `effect`，非常麻烦。


当然有更好的方法实现响应式。因为每个响应式数据都有它对应的 effect，所以我们再定义一个 `track函数`，跟踪一个响应式数据所有的 effect，并把 effect 保存在一个`Set` 集合中，方便以后数据变化的时候调用。这个集合的名字叫 `dep`，借助 Set 这种数据类型，可以保证保存的 effect 不是重复的。

`trigger函数`会触发 track 追踪的所有 effect，完成数据的更新。
```js
let price = 5
let count = 8
let sell = 0
let profit = 0

let effect1 = () => { sell = price*count } // 建立了一个依赖关系
let effect2 = () => { profit = price*count - 20 } // 建立了一个依赖关系

let dep = new Set() // 用来存储 price 的 effects

function track(effect) { dep.add(effect) }
function trigger() { dep.forEach(effect => effect()) }

track(effect1) // 依赖收集
track(effect2) // 依赖收集
...
trigger() // 触发更新
```

# dep 的存储
随着我们的响应式数据的增多，以及对响应式数据的使用增多，而通常我们的对象有多个响应式属性，每个响应式属性都有自己的依赖（dep），或者说存储了许多 effect 的集合。所以我们需要一个 `Map`，来存储每个响应式属性，以及其所有的 effect Set，这就是 `depsMap`。
```js
let price = 5
let count = 8
let sell, profit, sellNum, sellNum2

let effect1 = () => { sell = price*count }
let effect2 = () => { profit = price*count - 20 }
let effect3 = () => { sellNum = count }
let effect4 = () => { sellNum2 = count*2 }

// 存储所有响应式属性到其dep的映射
depsMap = new Map()

// key 是响应式属性，effect 是对响应式属性的引用
function track(key, effect){
    let dep = depsMap.get(key)
    if(!dep){
        depsMap.set(key, dep = new Set())
    }
    dep.add(effect)
}

function trigger(key) {
    let dep = depsMap.get(key)
    if(dep){
        dep.forEach(effect => {
            effect()
        })
    }
}

// 依赖收集
track('price', effect1)
track('price', effect2)
track('count', effect3)
track('count', effect4)

// 触发更新
trigger('price')
trigger('count')

```

# 对象的响应式
不同的响应式数据又通常是属于不同的响应式对象的，我们在实际开发中需要监听很多对象的响应式。如何把 depsMap 进一步映射到对象上，存储每个响应对象，和对象的响应式属性呢？使用 `WeakMap`，WeakMap 的好处是会自动释放内存
```js
let product = { price:5, count: 8 }
let user = { name: 'Smith', age: 25 }
let sell, profit, greeting, getAge

let effect1 = () => { sell = product.price*product.count } 
let effect2 = () => { profit = product.price*product.count - 20 } 
let effect3 = () => { greeting = user.name + " Hello!" } 
let effect4 = () => { getAge = user.name + " is " + user.age + " years old."}

const targetMap = new WeakMap()

function track(target, key, effect){
    let depsMap = targetMap.get(target)
    if(!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }
    let dep = depsMap.get(key)
    if(!dep){
        depsMap.set(key, dep = new Set())
    }
    dep.add(effect)
}

function trigger(target, key) {
    const depsMap = targetMap.get(target)
    if(!depsMap) { return }
    let dep = depsMap.get(key)
    if(dep){
        dep.forEach(effect => {
            effect()
        })
    }
}

// 依赖收集
track(product, 'price', effect1)
track(product, 'price', effect2)
track(user, 'name', effect3)
track(user, 'name', effect4)

// 触发更新
trigger(product, 'price')
trigger(user, 'name')
```

# Proxy
我们都知道 Vue3 使用 Proxy 来实现对对象的代理，为什么要代理对象？因为通过代理，我们可以设置 get 和 set 方法，拦截对象属性的读取和赋值操作，从而自动进行**依赖收集**和**触发更新**，就不用手写 track() 和 trigger() 了。 

`Proxy` 的代理会对整个对象的所有属性起作用，并且可以监听数组的变化，不同于 `Object.defineProperty` 必须遍历对象的每个属性。但是 Proxy 并不会做深层的监听。
```js
const reactiveObj = new Proxy(target, handler)

const handler = {
  get(target, key) {
    // 如果值是对象，那么对这个对象再进行一层代理
    if (typeof target[key] == 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    track(target, key)
    return Reflect.get(target, key)
  },
  set(target, key, value) {
    trigger(target, key)
    return Reflect.set(target, key, value)
  }
}
```
# 完整代码
使用变量 `activeEffect` 来临时存储当前正在执行的 effect。最终我们实现的响应式效果是：
```js
// 全局变量记录当前 effect
let activeEffect

// 定义 effect 函数
function effect(fn) {
  activeEffect = fn     // 临时存储当前 effect
  fn()                  // 执行函数（触发属性访问，触发依赖收集）
}

const targetMap = new WeakMap()

function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map())
  }
  
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, dep = new Set())
  }
  
  dep.add(activeEffect) // 直接使用全局的 activeEffect
}

function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (!depsMap) return
  const dep = depsMap.get(key)
  if (dep) {
    dep.forEach(effect => effect())
  }
}

// Rroxy Handler对象
const handler = {
  get(target, key) {
    // 如果属性是对象，递归代理
    if (typeof target[key] === 'object' && !!target[key]) {
      return new Proxy(target[key], handler)
    }
    
    track(target, key)
    return Reflect.get(target, key)
  },
  
  set(target, key, value) {
    const result = Reflect.set(target, key, value)
    trigger(target, key)
    return result
  }
}


// 初始数据
let product = { price:5, count: 8 }
let user = { name: 'Smith', age: 25 }
let sell, profit, greeting, getAgex

// 通过Proxy创建响应式对象
const reactiveProduct = new Proxy(product, handler)
const reactiveUser = new Proxy(user, handler)

// 定义副作用（会自动收集依赖）
effect(() => { sell = reactiveProduct.price * reactiveProduct.count })
effect(() => { profit = reactiveProduct.price * reactiveProduct.count - 20 })
effect(() => { greeting = reactiveUser.name + " Hello!" })
effect(() => { getAge = reactiveUser.name + " is " + reactiveUser.age + " years old." })


// 测试触发更新
console.log(sell) // 40
reactiveProduct.price = 10
console.log(sell) // 80

console.log(greeting) // Smith Hello!
reactiveUser.name = 'Alice'
console.log(greeting) // Alice Hello!
```
数据响应式的自动触发实现成功！那么只要在数据更新后渲染页面，也就可以实现页面数据的响应式更新了。
