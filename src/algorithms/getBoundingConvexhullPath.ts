function getBoundingConvexhullPath(boundingConvexhull: number[][]):string {
  return 'M' + boundingConvexhull.join('L') + 'Z';
}
export default getBoundingConvexhullPath;