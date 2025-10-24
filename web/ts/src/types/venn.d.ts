declare module "venn.js" {
  import * as d3 from "d3";

  export function VennDiagram(): any;
  export function sortAreas(selection: d3.Selection<any, any, any, any>, d: any): void;

  const vennjs: {
    VennDiagram: typeof VennDiagram;
    sortAreas: typeof sortAreas;
  };

  export default vennjs;
}