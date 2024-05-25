import { Component } from '@angular/core';


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
  pdfSrc: string = '/assets/sample.pdf';

  constructor() {}

  ngOnInit(): void {}
}
