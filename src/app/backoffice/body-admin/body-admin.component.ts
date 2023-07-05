import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-body-admin',
  templateUrl: './body-admin.component.html',
  styleUrls: ['./body-admin.component.scss']
})
export class BodyAdminComponent implements OnInit {
  activityReservationCount!: { [key: string]: number };
  readonly API_URL = 'http://localhost:8082';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getActivityReservationCount();
  }

  getActivityReservationCount(): void {
    this.http.get<any>(`${this.API_URL}/reservationCount`)
      .subscribe(
        (response) => {
          this.activityReservationCount = response;
          this.generateChart();
        },
        (error) => {
          console.error('Error fetching activity reservation count:', error);
        }
      );
  }



  createChart(activities: any[], counts: any[]): void {
    const canvas: any = document.getElementById('reservation-activite');
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: activities,
        datasets: [
          {
            label: 'Reservations per Activity',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }

  generateChart(): void {
    const activities = Object.keys(this.activityReservationCount);
    const counts = Object.values(this.activityReservationCount);
    this.createChart(activities, counts);
  }
}
