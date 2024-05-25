import { Component } from '@angular/core';
import {PdfService} from "../services/pdf/pdf.service";


@Component({
  selector: 'app-pdf-viewer',
  styleUrl: './pdf-viewer.component.css',
  template: `
    <div class="pdf-container">
      <pdf-viewer [src]="pdfSrc"
                  [render-text]="true"
                  [original-size]="false"
                  [fit-to-page]="true"
                  style="display: block; width: 100%; height: 100%;"
      ></pdf-viewer>
    </div>
  `
})
export class PdfViewerComponent {
  pdfSrc: string;

  constructor(private pdfService: PdfService) {}

  ngOnInit(): void {
    this.pdfService.getPdfUrl('Overtime Ashimov Yerzhan.pdf').subscribe(
      (url: string) => {
        console.log(url);
        this.pdfSrc = url;
      },
      (error) => {
        console.error('Error loading PDF URL', error);
      }
    );
  }
}
