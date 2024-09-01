# use-lazy-data
- Load when used and only once - (使用时加载且只加载一次)


## Install 
```bash
pnpm add use-lazy-data
```
```bash
yarn add use-lazy-data
```
```bash
npm install use-lazy-data
```

## Usage
```typescript
import useLazyData from 'use-lazy-data'
const data = useLazyData(() => ({
 name: 'Jaye'
}))
console.log(data) -> "{}"
data.value
console.log(data) -> "{ value: { name: 'Jaye' } }"

const data2 = useLazyData({
  name: () => 'Jaye',
})
console.log(data2) -> "{}"
data2.name
console.log(data2) -> "{ name: 'Jaye' }"
```