import React, {ReactElement} from 'react';
import {Select} from 'antd';
import {Patient} from "../dto/Patient";
import {PatientService} from "../services/PatientService";
import {ProfessionService} from "../services/ProfessionService";
import {Profession} from "../dto/Profession";

const {Option} = Select;

export const createOption = (k: string, v: string, index?: number): ReactElement => <Option value={k}
                                                                                            key={k}>{`${index !== undefined ? '' + (index + 1) + ' - ' : ''}${v}`}</Option>;
export const createCustomOption = (k: string, v: string): ReactElement => <Option value={k} key={k}>{`${v}`}</Option>;
const createOption_CA = (k: string, v: string): ReactElement => <Option value={v + '|' + k} key={k}>{v}</Option>;

export const getPatientSelectors = async () => {
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    let patientSelectors = new Array();
    let patients: Patient[] = [];
    await PatientService.getPatients()
        .then(response => {
            patients = response.data.map(man => {
                return {
                    id: man.id,
                    lastName: man.lastName || '',
                    firstName: man.firstName || '',
                    middleName: man.middleName || ''
                } as Patient;
            });
        })
        .finally(() => patientSelectors = Array.from(patients)
            .map((m) => createCustomOption(String(m.id), `${m.lastName} ${m.firstName} ${m.middleName}`)));
    return patientSelectors;
};
export const getProfessionSelectors = async () => {
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    let professionSelectors = new Array();
    let professions: Profession[] = [];
    await ProfessionService.getProfessions()
        .then(response => {
            professions = response.data.map(pro => {
                return {
                    id: pro.id,
                    profession: pro.profession,
                } as Profession;
            });
        })
        .finally(() => professionSelectors = Array.from(professions)
            .map((pro) => createCustomOption(String(pro.id), `${pro.profession}`)));
    return professionSelectors;
};


