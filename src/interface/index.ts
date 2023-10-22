interface Node {
  id: string,
}
interface DiskNodeItem extends Node {
  r: number,
  cx: number,
  cy: number
}
export {
  DiskNodeItem,
}