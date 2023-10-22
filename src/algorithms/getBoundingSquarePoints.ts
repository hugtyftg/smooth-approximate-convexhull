import { DiskNodeItem } from "../interface";
// Calculte the bounding square vertex of disks.
function getBoudingSqurePoints(DiskNodeList: DiskNodeItem[]): [number, number][] {
  let boundingPoints: [number, number][] = new Array();
  DiskNodeList.forEach((diskNode: DiskNodeItem) => {
    let leftTopPoint: [number, number], 
    leftBottomPoint: [number, number], 
    rightTopPoint: [number, number], 
    rightBottomPoint: [number, number];
    leftTopPoint = [diskNode.cx - diskNode.r, diskNode.cy - diskNode.r];
    leftBottomPoint = [diskNode.cx - diskNode.r, diskNode.cy + diskNode.r];
    rightTopPoint = [diskNode.cx + diskNode.r, diskNode.cy - diskNode.r];
    rightBottomPoint = [diskNode.cx + diskNode.r, diskNode.cy + diskNode.r];
    boundingPoints.push(...[leftTopPoint, leftBottomPoint, rightTopPoint, rightBottomPoint]);
  });
  return boundingPoints;
}
export default getBoudingSqurePoints;