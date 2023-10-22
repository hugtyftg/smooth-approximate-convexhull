import { select } from "d3";
import { DiskNodeItem } from "./interface";
import { getBoundingConvexhull, getBoundingConvexhullPath, getBoundingHexaPoints, getBoundingSquarePoints, getSmoothConvexhullPath} from './algorithms'
let randomGenerateDisks = (disksNum: number, maxR: number, minR: number, centerCoordiate: number[], centerRange: number): DiskNodeItem[] => {
  let disks: DiskNodeItem[] = Array.from({length: disksNum}, (v: any, k: number) => {
    let id: string = String(k);
    let r: number = Math.floor(Math.random() * (maxR + 1)) + 1 + minR;
    let cx: number = Math.floor(Math.random() * (centerRange + 1) + centerCoordiate[0]) + 1;
    let cy: number = Math.floor(Math.random() * (centerRange + 1) + centerCoordiate[1]) + 1;
    return {
      id,
      r,
      cx,
      cy
    }
  })
  return disks;
}
const renderDisks = (disksCell: any, disks: DiskNodeItem[]) => {
  disksCell
  .selectAll('circle.disk')
  .data(disks)
  .enter()
    .append('circle')
    .attr('class', 'disk')
    .attr('id', (d: DiskNodeItem) => d.id)
    .attr('cx', (d: DiskNodeItem) => d.cx)
    .attr('cy', (d: DiskNodeItem) => d.cy)
    .attr('r', (d: DiskNodeItem) => d.r)
    .attr('fill', 'green')
    .attr('stroke', 'black')
    .attr('stroke-width', 1)
    .attr('opacity', 1)
}
const renderBoundingPoints = (boundingPointsCell: any, boundingPoints: [number, number][]) => {
  boundingPointsCell
  .selectAll('circle.boundingPoint')
  .data(boundingPoints)
  .enter()
    .append('circle')
    .attr('class', 'boundingPoint')
    .attr('cx', (d: number[]) => d[0])
    .attr('cy', (d: number[]) => d[1])
    .attr('r', 2)
    .attr('fill', 'red')
    .attr('stroke', 'black')
    .attr('stroke-width', 2)
    .attr('opacity', 1)
}
const renderBoundingConvexhull = (convexhullCell: any, boundingConvexhull: [number, number][]) => {
  convexhullCell
  .append('path')
  .attr('class', 'boundingConvexhull')
  .attr('d', getBoundingConvexhullPath(boundingConvexhull))
  .attr('stroke', 'black')
  .attr('stroke-width', 2)
  .attr('fill', 'none')
}
const renderSmoothBoundingConvexhull = (smoothConvexhullCell: any, boundingConvexhull: [number, number][]) => {
  smoothConvexhullCell
  .append('path')
  .attr('class', 'smoothBoundingConvexhull')
  .attr('d', getSmoothConvexhullPath(boundingConvexhull))
  .attr('stroke', 'blue')
  .attr('opacity', 0.7)
  .attr('storke-width', 1)
  .attr('fill', 'lightblue')

}
(() => {
  // Randomly generate several disks with random radius and center coordinates.
  let disks: DiskNodeItem[] = randomGenerateDisks(5, 70, 15,[500, 500], 300);

  // Prepare svg canvas to lay the graphics on.
  const svg: any = select('svg#main')
    .attr('width', 1000)
    .attr('height', 1000)
    .attr('stroke', 'black');
  const disksCell = svg
    .append('g')
    .attr('id', 'disksCell');
  renderDisks(disksCell, disks);

  // Calculate all the bounding points of the disks by bounding square or hexagon.
  // let boundingPoints: [number, number][] = getBoundingSquarePoints(disks);
  let boundingPoints: [number, number][] = getBoundingHexaPoints(disks);

  // Render all the bounding points.
  const boundingPointsCell: any = svg
    .append('g')
    .attr('id', 'boundingPointsCell');
  // renderBoundingPoints(boundingPointsCell, boundingPoints);

  // Attain the 2d convexhull of the bounding points.
  let boundingConvexhull: [number, number][] = getBoundingConvexhull(boundingPoints);

  // Render the polygon convexhull.
  const boundingConvexhullCell: any = svg
    .append('g')
    .attr('id', 'boundingConvexhull');
  // renderBoundingConvexhull(boundingConvexhullCell, boundingConvexhull);
  
  // Render the smooth convexhull.
  const smoothBoundingConvexhullCell: any = svg
    .append('g')
    .attr('id', 'smoothBoundingConvexhull')
  renderSmoothBoundingConvexhull(smoothBoundingConvexhullCell, boundingConvexhull)
})();