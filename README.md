# use-lazy-data
- Load data when in use - 使用时加载数据


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
const data = useLazyData(fn)
console.log(data.value)
```