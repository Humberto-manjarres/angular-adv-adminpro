import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {

  /* TODO: LO QUE EL COMPONENTE RECIBE */
  @Input() public title: string = 'Sin titulo';

  @Input('labels') public doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];  

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [ 350, 450, 100 ] }
    ]}

  };
  