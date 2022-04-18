export class formValues{
public storeName: string;
public date: string;
public servedBy: string;
public email: string;
public btBroadband: string;
public btTvPackage: string;
public sportPackage: string;
public totalPayment: number;
public otherHandyInfo: string;

  constructor(value: any){
      this.storeName = value.storeName;
      this.date = value.date;
      this.servedBy = value.servedBy;
      this.email = value.email;
      this.btBroadband = value.btBroadbrend;
      this.btTvPackage = value.btTvPackage;
      this.sportPackage = value.sportPackage;
      this.totalPayment = value.totalPayment;
      this.otherHandyInfo = value.otherHandyInfo;
  }
}
