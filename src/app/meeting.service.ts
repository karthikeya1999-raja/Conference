import  Peer ,{ MediaConnection} from 'peerjs';
import { Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { StorageService } from './storage.service';
import { Meeting } from './meating.model';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MeetingService{

  peerId: string;
  peer: Peer;
  rmsg = new Subject<string>();
  mdconn: MediaConnection;
  videoTrack : MediaStreamTrack;
  audioTrack : MediaStreamTrack;
  peerList = [];
  currentPeer;
  myStream;
  vedio;

  meetings: { meeting: Meeting, email: string, id: string, status?: string }[] = [];
  userEmail : string;
  meetingsChanged = new Subject<{meeting:Meeting,email:string,id:string,status?:string}[]>();
  meetingId = new Subject<string>();

  constructor(private sservice : StorageService,
    private athService : AuthService){}


  generateMeetingId() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getMeeting(id : number){
    return this.meetings[id];
  }

  updateMeeting(meeting : Meeting,id : number){
    meeting.meetingId = this.meetings[id].meeting.meetingId;
    this.meetings[id].meeting = meeting;
    return this.sservice.updateUserSchedule(meeting,this.meetings[id].id);
  }

  scheduleNewMeeting(meeting:Meeting){
    this.userEmail = this.athService.getEmail();
    return this.sservice.storeUserSchedule(meeting,this.userEmail);
  }

  deleteMeeting(id : string){
    return this.sservice.deleteUSerSchedule(id);
  }

  toNumberArray(arr: string[]) {
    var numArray: number[] = [];
    for (const key of arr) {
      numArray.push(parseInt(key, 10));
    }
    return numArray;
  }

  getMyScheduleInfo() {
    this.userEmail = this.athService.getEmail();
    this.sservice.getUserSchedule().subscribe(meetings => {
      this.meetings = [];
      for (const key of meetings) {
        if (key.email == this.userEmail) {
          this.meetings.push(key);
        }
      }
      for (const key of this.meetings) {
        const date = this.toNumberArray(key.meeting.mdate.split("-"));
        const time = this.toNumberArray(key.meeting.time.split(":"));
        const dur = this.toNumberArray(key.meeting.duration.split(":"));
        const msDate = new Date(date[0], date[1] - 1, date[2], time[0], time[1]);
        const meDate = new Date(date[0], date[1] - 1, date[2], time[0] + dur[0], time[1] + dur[1]);
        const tDate = new Date();
        if (tDate < msDate) {
          key.status = "Yet to Start";
        } else if (tDate < meDate && tDate > msDate) {
          key.status = "On Going";
        } else {
          key.status = "Ended";
        }
      }
      this.meetingsChanged.next(this.meetings);
    });
  }

  changeVideo(){
    this.videoTrack.enabled = !this.videoTrack.enabled;
  }

  changeAudio(){
    this.audioTrack.enabled = !this.audioTrack.enabled;
  }

  joinMeeting(receiver: string,name : string, mref: any, rref : any) {

    console.log("Entered makeCall function");
    var n = <any>navigator;

    var peer = new Peer(name, { host: 'localhost', port: 9000, path: '/' });
    this.peer = peer;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: MediaStream) => {


      this.audioTrack = stream.getTracks()[0];
      this.videoTrack = stream.getTracks()[1];

      console.log(stream.getTracks());

      const call = peer.call(receiver, stream);

      this.myStream = stream;
      this.addStream(mref,stream);

      call.on('stream', (remoteStream) => {

         if(!this.peerList.includes(call.peer)){

           this.mdconn = call;
           this.addStream(rref, remoteStream);
           this.currentPeer = call.peerConnection;
           this.peerList.push(call.peer);
         }
      });

      call.on('close', ()=>{
        peer.disconnect();
        peer.destroy();
      })
    }).catch((err) => {
      console.error('Failed to get local stream', err);
  })
}

  createNewMeeting(meetingId : string,rref: any,mref : any) {
    console.log("Entered answer ",meetingId);

    var peer = new Peer(meetingId,{ host: 'localhost', port: 9000, path: '/' });
    this.peer = peer;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: MediaStream) => {

      this.audioTrack = stream.getTracks()[0];
      this.videoTrack = stream.getTracks()[1];

      console.log(stream.getTracks());

      this.myStream = stream;
      this.addStream(mref,stream);

      peer.on('call', (call) => {

        if (confirm(call.peer + " is requesting to join meeting")) {

          call.answer(stream);

          call.on('stream', (remoteStream) => {

            if(!this.peerList.includes(call.peer)){

            this.mdconn = call;
            this.addStream(rref,remoteStream);
            this.currentPeer = call.peerConnection;
            this.peerList.push(call.peer);
             }
          });

          call.on('close', ()=>{
              peer.disconnect();
              peer.destroy();
          })
        }
      });
    }).catch((err) => {
      console.error('Failed to get local stream', err);
    });
  }

  endCall(){
    this.mdconn.close();
    this.peerList = [];
  }

  addStream(ref : any, remoteStream : MediaStream){
    this.vedio = ref.nativeElement
    this.vedio.srcObject = remoteStream;
    this.vedio.play();
  }

  screenShare(){
    var n = <any>navigator;
    n.mediaDevices.getDisplayMedia(
      {video :
        {
          cursor:"always"
        },
       audio :
      {
        echoCancellation: true,
        noiseSuppression: true
      }
    }).then((stream : MediaStream) => {
      let videoTrack = stream.getVideoTracks()[0];
      videoTrack.onended = () => {
        this.stopScreenShare();
      }
      let sender = this.currentPeer.getSenders().find((s) => {
        return s.track.kind == videoTrack.kind;
      })
      sender.replaceTrack(videoTrack);
    }).catch((err) => {
      console.log("Unable to get display media "+err);
    })
  }


  stopScreenShare(){
    let videoTrack = this.myStream.getVideoTracks()[0];
    var sender = this.currentPeer.getSenders().find((s) => {
      return s.track.kind == videoTrack.kind;
    });
    sender.replaceTrack(videoTrack);
  }

}
