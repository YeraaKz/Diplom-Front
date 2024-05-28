import { Component } from '@angular/core';
import {PdfService} from "../services/pdf/pdf.service";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";


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
  private subscriptions = new Subscription();

  constructor(private pdfService: PdfService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const fileKey = this.route.snapshot.paramMap.get('fileKey');

    if (fileKey) {
      this.subscriptions.add(this.pdfService.getPdfUrl(fileKey).subscribe(url => {
        this.pdfSrc = url;
      }))
    }
  }
}
