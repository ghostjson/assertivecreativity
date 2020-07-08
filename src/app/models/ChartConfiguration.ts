import { ChartData, ChartOptions, ChartType } from 'chart.js';

export class ChartConfiguration {
  constructor(
    public title: string,
    public cardType: string,
    public chartType: ChartType,
    public data: ChartData,
    public options: ChartOptions
  ) {}

}
