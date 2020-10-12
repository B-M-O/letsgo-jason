import { Pipe, PipeTransform } from "@angular/core";

import { ArgonautDb } from "../_interfaces/argonaut-db";

@Pipe({name: 'argonautOrderBy'})
export class ArgonautOrderByPipe implements PipeTransform {
  transform(argonautsArray: Array<ArgonautDb>, field: string, direction: string): Array<any> {


    if (argonautsArray === undefined || argonautsArray === null ||
        argonautsArray.length <= 0 || argonautsArray[0] === undefined)
      return new Array<ArgonautDb>();

    if (!argonautsArray[0].hasOwnProperty(field))
    {
      console.log(`OrderBy pipe : invalid field (got ${field})`);
      return argonautsArray;
    }

    argonautsArray.sort((a: any, b: any) => {
      
      let valueA: any = a[field];
      let valueB: any = b[field];

      let ascending: boolean = direction == "asc";

      if (typeof field == "string")
      {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }
      
      if (valueA < valueB) {
        return ascending ? -1 : 1;
      } else if (valueA > valueB) {
        return ascending ? 1 : -1;
      } else {
        return 0;
      }
    });
    return argonautsArray;
  }

}