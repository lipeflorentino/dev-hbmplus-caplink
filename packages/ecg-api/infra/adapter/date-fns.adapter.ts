import { format, FormatOptions } from 'date-fns';

export class DateFNS {
    formatDate(date: string | number | Date, formatStr: string, options?: FormatOptions): string {
        return format(date, formatStr, options);
    }
}