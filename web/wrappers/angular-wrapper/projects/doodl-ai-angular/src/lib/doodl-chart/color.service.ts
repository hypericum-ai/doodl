import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ColorService {
  constructor(private http: HttpClient) {}

  getColors(colors: string = 'pastel', n_colors: number = 10, desat: number = 1.0) {
    const url = 'https://svgtopng.doodl.ai/colors';

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams({
      colors: colors,
      n_colors: n_colors.toString(),
      desat: desat.toString()
    });

    return this.http.post(url, body.toString(), { headers });
  }
}