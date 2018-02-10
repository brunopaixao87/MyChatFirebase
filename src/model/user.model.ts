export class User {

  public $key: string;

  constructor(public name: string,
              public username: string,
              public email: string,
              public password: string,
              public photo: string) {
  }

}
