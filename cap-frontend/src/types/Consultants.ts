

export interface Consultants {
  id: number;
  title: string;
  consultant: consultant;
  service: service;
  about: string;
  session_charge: string;
  profile_img: string;
  live: Array<number>;
}

export interface consultant {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface service {
  id: number;
  category: string;
}

