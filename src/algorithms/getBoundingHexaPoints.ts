import { DiskNodeItem } from "../interface";
// Calculte the bounding hexagon vertex of disks.
function getBoudingHexaPoints(DiskNodeList: DiskNodeItem[]): [number, number][] {
  let boundingPoints: [number, number][] = new Array();
  const theta: number = Math.PI * 2 / 6;
  const sinTheta: number = Math.sin(theta);
  for (let i = 0; i < DiskNodeList.length; i++) {
    const curDiskNode: DiskNodeItem = DiskNodeList[i];
    let side: number = curDiskNode.r / sinTheta;
    boundingPoints.push([curDiskNode.cx - side, curDiskNode.cy]);
    boundingPoints.push([curDiskNode.cx - side / 2, curDiskNode.cy - curDiskNode.r]);
    boundingPoints.push([curDiskNode.cx + side / 2, curDiskNode.cy - curDiskNode.r]);
    boundingPoints.push([curDiskNode.cx + side, curDiskNode.cy]);
    boundingPoints.push([curDiskNode.cx + side / 2, curDiskNode.cy + curDiskNode.r]);
    boundingPoints.push([curDiskNode.cx - side / 2, curDiskNode.cy + curDiskNode.r]);
  }
  return boundingPoints;
}
export default getBoudingHexaPoints;