import { Pipe, PipeTransform } from "@angular/core";
import { differenceInYears } from 'date-fns'

@Pipe({
    name: 'age'
})
export class AgePipe implements PipeTransform {

    transform(value?: string): number {
        return differenceInYears(new Date(), new Date(value as string))
    }
}