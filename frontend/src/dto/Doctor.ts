import {Profession} from "./Profession";

export interface Doctor {
  id: number;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  professionId?: number;

  profession?: Profession;

}
