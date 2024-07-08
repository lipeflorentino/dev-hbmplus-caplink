export interface DateAdapter {
    formatDate(date: string | number | Date, formatStr: string, options?: any): string;
}