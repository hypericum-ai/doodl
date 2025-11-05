import { Component, signal, PLATFORM_ID, Inject, Input, OnInit } from '@angular/core';
import { DoodlChart } from './charts/doodl-chart/doodl-chart';
import { CommonModule } from '@angular/common';

declare var Doodl: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DoodlChart],
  templateUrl: './app.html',
  styleUrl: './app.css',
  host: { ngSkipHydration: '' },
})
export class App implements OnInit {
  protected readonly title = signal('doodl-angular');
  chartType: string = '';
  size: { width: number; height: number } = { width: 500, height: 500 };
  data: any = [];
  options: any = {};
  colors: string[] = [
    '#A1C9F4',
    '#FFB482',
    '#8DE5A1',
    '#FF9F9B',
    '#D0BBFF',
    '#DEBB9B',
    '#FAB0E4',
    '#CFCFCF',
    '#FFFEA3',
    '#B9F2F0',
  ];

  demo_charts = [
    {
      chartType: 'piechart',
      data: [
        { label: 'Apples', value: 10 },
        { label: 'Bananas', value: 20 },
        { label: 'Cherries', value: 15 },
        { label: 'Grapes', value: 25 },
      ],
      options: {
        donut: false,
        continuous_rotation: true,
        show_percentages: true,
      },
    },


    {
      chartType: 'piechart',
      data: [
        { label: 'Apples', value: 10 },
        { label: 'Bananas', value: 20 },
        { label: 'Cherries', value: 15 },
        { label: 'Grapes', value: 25 },
      ],
      options: {
        donut: true,
        continuous_rotation: false,
        show_percentages: false,
      },
    },
    {
      chartType: 'piechart',
      data: [
        { label: 'Apples', value: 10 },
        { label: 'Bananas', value: 20 },
        { label: 'Cherries', value: 15 },
        { label: 'Grapes', value: 25 },
      ],
      options: {
        donut: false,
        continuous_rotation: true,
        show_percentages: false,
      },
    },

    {
      chartType: 'barchart',
      data: [
        { label: 'Apples', value: 10 },
        { label: 'Bananas', value: 20 },
        { label: 'Cherries', value: 15 },
        { label: 'Grapes', value: 25 },
      ],
      options: {
        horizontal: false,
        moving_average: true,
        x_label_angle: 90,
      },
    },


    {
      chartType: 'barchart',
      data: [
        { label: 'Apples', value: 10 },
        { label: 'Bananas', value: 20 },
        { label: 'Cherries', value: 15 },
        { label: 'Grapes', value: 25 },
      ],
      options: {
        horizontal: true,
        moving_average: false,
        x_label_angle: 90,
      },
    },

    // {
    //   chartType: 'areachart',
    //   data: [
    //     { x: 1, y: 10 },
    //     { x: 2, y: 20 },
    //     { x: 3, y: 15 },
    //     { x: 4, y: 25 },
    //     { x: 5, y: 30 },
    //     { x: 6, y: 35 },
    //   ],
    //   options: {
    //     curved: true,
    //   },
    // },

    // {
    //   chartType: 'vennchart',
    //   data: [
    //     { sets: ['A'], size: 10 },
    //     { sets: ['B'], size: 15 },
    //     { sets: ['C'], size: 20 },
    //     { sets: ['A', 'B'], size: 5 },
    //     { sets: ['A', 'C'], size: 3 },
    //     { sets: ['B', 'C'], size: 4 },
    //     { sets: ['A', 'B', 'C'], size: 2 },
    //   ],
    //   options: {},
    // },

    // {
    //   chartType: 'dotplot',
    //   data: [
    //     { category: 'A', value: 10 },
    //     { category: 'A', value: 12 },
    //     { category: 'A', value: 16 },
    //     { category: 'B', value: 20 },
    //     { category: 'B', value: 24 },
    //     { category: 'B', value: 28 },
    //     { category: 'C', value: 12 },
    //     { category: 'C', value: 15 },
    //     { category: 'C', value: 21 },
    //   ],
    //   options: {},
    // },

    // {
    //   chartType: 'scatterplot',
    //   data: [
    //     { x: 10, y: 20 },
    //     { x: 30, y: 40 },
    //     { x: 50, y: 60 },
    //   ],
    //   options: {
    //     dotsize: 8,
    //   },
    // },

    // {
    //   chartType: 'boxplot',
    //   data: [
    //     { category: 'A', value: 10 },
    //     { category: 'A', value: 15 },
    //     { category: 'A', value: 20 },
    //     { category: 'B', value: 30 },
    //     { category: 'B', value: 35 },
    //     { category: 'B', value: 40 },
    //   ],
    //   options: {},
    // },

    // {
    //   chartType: 'contour',
    //   data: [
    //     [0, 10, 20, 30, 20],
    //     [10, 20, 30, 40, 30],
    //     [20, 30, 40, 50, 40],
    //     [10, 20, 30, 40, 30],
    //     [0, 10, 20, 30, 20],
    //   ],
    //   options: {},
    // },

    // {
    //   chartType: 'chord',
    //   data: [
    //     [0, 5, 10, 2],
    //     [5, 0, 3, 7],
    //     [10, 3, 0, 6],
    //     [2, 7, 6, 0],
    //   ],
    //   options: {},
    // },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {}
}
