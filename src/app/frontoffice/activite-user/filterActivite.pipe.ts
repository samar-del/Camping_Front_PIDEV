import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class filterActivite implements PipeTransform {
  transform(items: any[], filterText: string): any[] {
    if (!items || !filterText) {
      return items; // Return the original items if no filter or items are provided
    }

    // Apply the filter
    filterText = filterText.toLowerCase();
    return items.filter(item => {
      // Customize this condition based on your specific filtering requirements
      return item.nomActivite.toLowerCase().includes(filterText);
    });
  }
}
