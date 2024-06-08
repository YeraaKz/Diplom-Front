import { Component, OnInit } from '@angular/core';
import { CertificateService } from '../services/certificate/certificate.service';
import {CertificateInfoDTO} from "../services/certificate/сertificateInfoDTO";
import {Router} from "@angular/router";
import {QrcodeserviceService} from "../services/qrcode/qrcodeservice.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.css']
})
export class AchievementsComponent implements OnInit {
  certificates: CertificateInfoDTO[] = [];
  showModal: boolean = false;
  qrImageUrl: string = '';

  constructor(private certificateService: CertificateService,
              private router: Router,
              private qrCodeService: QrcodeserviceService,
              private toastr: ToastrService) { }

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

  openModal(url: string): void {
    this.qrCodeService.getQRCodeUrl(url).subscribe(
      (response: string) => {
        this.qrImageUrl = response;
        this.showModal = true;
      },
      error => {
        console.error('Error fetching QR code URL', error);
      }
    );
  }

  closeModal(): void {
    this.showModal = false;
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.qrImageUrl).then(() => {
      this.toastr.info('Ссылка скопирована в буфер обмена');
    }).catch(err => {
      console.error('Ошибка копирования ссылки: ', err);
    });
  }
}
