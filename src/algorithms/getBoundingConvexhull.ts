
function getBoundingConvexhull(boundingPoints: [number, number][]): [number, number][] {
  // 空数组转换成布尔值为true，所以要判断数组长度
  if (!boundingPoints || boundingPoints.length === 0) return [];
  // 将节点排序
  boundingPoints.sort((a: number[], b: number[]) => {
    return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
  })
  // 求解下凸包，得到逆时针的结果，从下侧的最左边到最右边
  let lowerConvexhull: [number, number][] = [];
  for (let i = 0; i < boundingPoints.length; i++) {
    while (lowerConvexhull.length >= 2 && 
      cross(lowerConvexhull[lowerConvexhull.length - 2], lowerConvexhull[lowerConvexhull.length - 1], boundingPoints[i]) <= 0
    ) {
      lowerConvexhull.pop();
    }
    lowerConvexhull.push(boundingPoints[i]);
  }

  // 求解上凸包，得到逆时针的结果，从上侧的最右边到最左边
  let upperConvexhull: [number, number][] = [];
  for (let i = boundingPoints.length - 1; i >= 0; i--) {
    while (upperConvexhull.length >= 2 && 
      cross(upperConvexhull[upperConvexhull.length - 2], upperConvexhull[upperConvexhull.length - 1], boundingPoints[i]) <= 0
    ) {
      upperConvexhull.pop();
    }
    upperConvexhull.push(boundingPoints[i]);
  }

  // 分别弹出一个端点，否则会多两个端点
  lowerConvexhull.pop();
  upperConvexhull.pop();
  return lowerConvexhull.concat(upperConvexhull);
}
// 叉乘积，小于0说明o在ab直线外侧（右手螺旋的外侧）
function cross(a: number[], b: number[], o: number[]) {
  return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
}

export default getBoundingConvexhull;