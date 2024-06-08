import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../services/certificate/certificate.service';
import {CertificateInfoDTO} from "../services/certificate/сertificateInfoDTO";
import {LessonDTO} from "../services/course/lessonDTO";
import {Router} from "@angular/router";


@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  certificates: CertificateInfoDTO[] = [];

  constructor(private certificateService: CertificateService,
              private router: Router) { }

  ngOnInit(): void {
    this.certificateService.getUserCertificates().subscribe(
      (data: CertificateInfoDTO[]) => {
        this.certificates = data;
      },
      error => {
        console.error('Error fetching certificates', error);
      }
    );
  }

  viewCertificate(url: string) {
    this.router.navigate(['/presentation', url]);
  }

  downloadCertificate(url: string): void {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'certificate.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
