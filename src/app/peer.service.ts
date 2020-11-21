import { Subject } from 'rxjs';
import Peer, { MediaConnection } from 'peerjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeerService {

  peerId: string;
  peer: Peer;
  rmsg = new Subject<string>();
  call = new Subject<boolean>();
  pr = new Subject<string>();
  isCallOn = false;
  mdconn: MediaConnection;

  // sendMessage(receiver: string, msg: string) {
  //   var conn;
  //   try {
  //     conn = this.peer.connect(receiver);
  //   } catch (error) {
  //     console.log("oops!! " + receiver + " is not Online");
  //   }
  //   conn.on('open', () => {
  //     conn.send(msg);
  //     console.log("Message sent to " + conn.peer);
  //     console.log(msg);
  //   });
  // }

  // reciveMessage() {
  //   this.peer.on('connection', (conn) => {

  //     console.log("Message received from " + conn.peer);

  //     conn.on('data', (data) => {
  //       this.rmsg.next(data);
  //       this.pr.next(conn.peer);
  //       console.log(data);
  //     });

  //   });
  // }

  makePeerId(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  makeCall(receiver: string, ref: any, video: boolean) {
    this.isCallOn = true;
    console.log("Entered makeCall function");
    var n = <any>navigator;
    n.getUserMedia({ video: video, audio: true }, (stream) => {

      console.log("Entered getUserMedia");

      const peer = new Peer(this.makePeerId());
      console.log(receiver);
      const call = peer.call(receiver, stream);
      call.on('stream', (remoteStream) => {

        this.mdconn = call;
        console.log("Entered call");

        console.log("this is ref " + ref);
        // setTimeout(() => {
        var vedio = ref.nativeElement
        vedio.srcObject = remoteStream;
        vedio.play();
        //},500);

      });
    }, (err) => {
      console.error('Failed to get local stream', err);
    });
  }

  answerCall(ref: any) {
    console.log("Entered answer");

    this.peer.on('call', (call) => {

      console.log("Entered peer.on");

      var n = <any>navigator;
      n.getUserMedia({ video: true, audio: true }, (stream) => {

        console.log("Entered getUserMedia");

        call.answer(stream);
        call.on('stream', (remoteStream) => {

          this.mdconn = call;
          this.isCallOn = true;
          this.call.next(this.isCallOn);
          console.log("Entered call");

          console.log("this is ref " + ref);
          // setTimeout(() => {
          var vedio = ref.nativeElement
          vedio.srcObject = remoteStream;
          vedio.play();
          //},500);

        });
      }, (err) => {
        console.error('Failed to get local stream', err);
      });
    });
  }

  // disconnectCall() {
  //   this.mdconn.close();
  //   this.isCallOn = false;
  //   this.call.next(this.isCallOn);
  // }

  createPeer(id: string) {
    this.peerId = id;
    this.peer = new Peer(id, { host: 'localhost', port: 9000, path: '/' });
    console.log(this.peer.id);
  }

  // getPeer() {
  //   return this.peer;
  // }

  constructor() { }
}
