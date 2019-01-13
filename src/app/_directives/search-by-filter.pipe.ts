import { Pipe, PipeTransform, Injectable  } from '@angular/core';

@Pipe({
    name: 'filter',
})
@Injectable()
export class FilterPipe implements PipeTransform {
    transform(items: any[], field: string, value: string): any[] {
        if (!items) {
            return [];
        }
        if (!field || !value) {
            return items;
        }

        return items.filter(singleItem =>
            singleItem[field].toLowerCase().includes(value.toLowerCase())
        );
    }
}

@Pipe({
    name: 'sortgrid'
})

@Injectable()
export class SortGridPipe implements PipeTransform {
    transform(array: Array<any>, args: string): Array<any> {
        if (typeof args[0] === 'undefined') {
            return array;
        }
        const direction = args[0][0];
        const column = args.replace('-', '');
        array.sort((a: any, b: any) => {
            const left = Number(new Date(a[column]));
            const right = Number(new Date(b[column]));
            return (direction === '-') ? right - left : left - right;
        });
        return array;
    }
}


@Pipe({
    name: 'dateRange'
})

@Injectable()
export class DateRangePipe implements PipeTransform {
    transform(items: any[], field: string, fromDate, toDate): any[] {
        const filtered = [];
        if (!items) {
            return [];
        }

       // console.log('fromDate =' + fromDate);
        console.log('field =' + field);

        if (!fromDate && !toDate) {
          //  console.log('Date deb et fin null  et field = ' + field);
            return items;
        }

        const from_date = Date.parse(fromDate);
        const to_date = Date.parse(toDate);

        items.forEach(function (item) {
            console.log('in the forEach function item[field] = ' + item[field]);

            const dateField = Date.parse(item.date);
            console.log('in the forEach function dateField =' + dateField);

            if (from_date && to_date && dateField > from_date && dateField < to_date) {
                console.log('in the if statement', filtered);
                filtered.push(item);
            }
        });

        return filtered;
 }
}

 // Utilisation dans HTML Template
 // <div ng-repeat="message in messages | dateRange: startDate : endDate" >
 //   <tr *ngFor="let item of pagedItems | filter : 'nom_pers' : searchString; let i = index ">
 // Mon adaptation à faire dans reunion_list component 
 // 	<div  *ngFor="let evt of evnmts | dateRange: 'date' : startDate : endDate""  class="col-md-10">
 //     Puis, créer StarDate et EndDate et les lié à 2 champs à créer dans le coponent.ts