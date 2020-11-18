export class Meeting{
  constructor(public mdate : string,
    public time : string,
    public duration : string,
    public topic : string){}

    getDate(){
      return this.mdate;
    }

    getTime(){
      return this.time;
    }

    getDuration(){
      return this.duration;
    }

    getTopic(){
      return this.topic;
    }
}
