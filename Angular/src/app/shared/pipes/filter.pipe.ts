import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],filterString: string, propName: string): any {
    const result=[];
    if(value.length==0 || filterString=== '' || propName === '')
    {
      return value;
    }

    for(const item of value)
    {
      if(item[propName]===filterString)
      {
        result.push(item);
      }
    }
    return result;
  }

}
