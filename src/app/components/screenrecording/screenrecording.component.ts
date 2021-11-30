import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

const mediaDevices = navigator.mediaDevices as any;
let completeBlob: Blob;


declare var MediaRecorder: any;
@Component({
  selector: 'app-screenrecording',
  templateUrl: './screenrecording.component.html',
  styleUrls: ['./screenrecording.component.css']
})
export class ScreenrecordingComponent implements OnInit {

  hasVideo: boolean = false;
  isRecording: boolean = false;
  recorder: any;
  stream: any;
  ngOnInit(): void {
  }

  @ViewChild('recordVideo')
  recordVideo!: ElementRef;




  async startRecording() {
    mediaDevices.getDisplayMedia({
      video: {
        mediaSource: "screen",
        displaySurface: "monitor",
        logicalSurface: false,
        cursor: "never",
        restrictOwnAudio: true
      }
    }).then((stream: any) => {
      this.recorder = new MediaRecorder(stream);


      const chunks: any[] | undefined = [];
      this.recorder.ondataavailable = (e: { data: any; }) => chunks.push(e.data);
      this.recorder.onstop = (e: any) => {
        completeBlob = new Blob(chunks, { type: chunks[0].type });
        this.recordVideo.nativeElement.src = URL.createObjectURL(completeBlob);
      };
      this.recorder.start();
    });

  }


  recordStart() {
    this.hasVideo = false;
    this.isRecording = true;
    this.startRecording();
  }


  recordStop() {
    this.hasVideo = true;
    this.isRecording = false;
    this.recorder.stop();
    this.stream.getVideoTracks()[0].stop();
  }


  downloadBlob(name = 'video.mp4'): any {


    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    const data = window.URL.createObjectURL(completeBlob);


    const link = document.createElement('a');
    link.href = data;
    link.download = name;


    // this is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window
      })
    );


    setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(data);
      link.remove();
    }, 100);
  }

}




