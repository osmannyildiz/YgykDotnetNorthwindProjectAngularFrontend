import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'filterPipe',
})
export class FilterPipePipe implements PipeTransform {
  transform(value: Product[], filterText: string): Product[] {
    if (filterText && filterText.length >= 2) {
      filterText = filterText.toLocaleLowerCase();
      return value.filter(
        (p: Product) => p.productName.toLocaleLowerCase().indexOf(filterText) !== -1
      );
    }
    return value;
  }
}
