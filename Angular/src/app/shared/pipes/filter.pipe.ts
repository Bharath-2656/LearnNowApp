import { LowerCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],filterString: string, propertyName: string): any {
    const result=[];
    if(value.length==0 || filterString=== '' || propertyName === '')
    {
      return value;
    }

    // for(const item of value)
    // {
    //   if(item[propertyName] ===filterString)
    //   {
    //     result.push(item);
    //   }
    // }
    // return result;

    if(propertyName==='price')
    {
      for(const item of value)
      {
        if(item[propertyName]==filterString)
        {
          result.push(item);
        }
      }
      return result;
      
    }
    return value.filter( str => {
      return str[propertyName].toLowerCase().includes(filterString.toLowerCase());
    });

  }

}
