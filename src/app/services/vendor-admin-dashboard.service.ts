import { Injectable } from '@angular/core';
import { ChartConfiguration } from '../models/ChartConfiguration';
import { StatusCard } from '../models/StatusCard';

@Injectable({
  providedIn: 'root'
})
export class VendorAdminDashboardService {
  charts: ChartConfiguration[];
  cards: StatusCard[];

  constructor() { }

  // charts data provider
  getCharts(): ChartConfiguration[] {
    this.charts = [
      new ChartConfiguration(
        'Monthly Sales',
        'card-success',
        'bar',
        {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First Dataset',
              data: [70, 90, 60, 85, 50, 75, 80],
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)',
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)',
              ],
              borderWidth: 1,
            },
          ]
        },
        {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      ),
      new ChartConfiguration(
        'Sales',
        'card-primary',
        'line',
        {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: '# of sales',
            data: [72, 49, 43, 49, 35, 82]
          }]
        },
        {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      )
    ];

    return this.charts;
  }

  // dashboard cards data provider
  getStatusCards(): StatusCard[] {
    this.cards = [
      {
        title: 'Orders this month',
        value: '100',
        classes: {
          'small-box': true,
          'bg-info': true,
        },
        icon: {
          'null': true
        }
      },
      {
        title: 'Order requests',
        value: '55',
        classes: {
          'small-box': true,
          'bg-success': true,
        },
        icon: {
          'null': true
        }
      },
      {
        title: 'User registrations',
        value: '40',
        classes: {
          'small-box': true,
          'bg-warning': true,
        },
        icon: {
          'null': true
        }
      },
      {
        title: 'Order cancellation',
        value: '20',
        classes: {
          'small-box': true,
          'bg-danger': true,
        },
        icon: {
          'null': true
        }
      }
    ];

    return this.cards;
  }
}
