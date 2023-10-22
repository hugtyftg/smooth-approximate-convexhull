import { line, curveCatmullRomClosed } from "d3";
function getSmoothConvexhullPath(convexhull: [number, number][]): string {
  let smoothConvexhullPath: string = '';
    const smoothCurveGenerator = line()
    .x((d: number[]) => d[0])
    .y((d: number[]) => d[1])
    .curve(curveCatmullRomClosed);
  smoothConvexhullPath = <string>smoothCurveGenerator(convexhull);
  return smoothConvexhullPath;
}
export default getSmoothConvexhullPath;