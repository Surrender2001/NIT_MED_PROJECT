import {FC, useEffect, useState} from "react";
import {Button, Card, Col, Row, Select, Space} from "antd";
import {getPatientSelectors} from "../utils/Selectors";
import {DefaultOptionType} from "antd/es/select";
import {VisitService} from "../services/VisitService";
import {Visit} from "../dto/Visit";
import {MessageService} from "../services/MessageService";
import {useCreateEntry} from "../utils/Hooks";
import {CheckCircleTwoTone} from "@ant-design/icons";

export const PatientView: FC = () => {
    const [patientSelectors, setPatientSelectors] = useState(new Array());
    const [loading, setLoading] = useState(true);
    const [visits, setVisits] = useState<Visit[]>(new Array());
    const [updateNeeded, setUpdateNeeded] = useState(false);
    const [patientId, setPatientId] = useState(-1);
    const [isDisabled, setIsDisabled] = useState(true);
    const createEntry = useCreateEntry();
    useEffect(() => {
        getPatientSelectors().then(result => setPatientSelectors(result)).finally(() => setLoading(false))
    }, []);


    useEffect(() => {
        updateNeeded && getVisits(patientId);
    }, [updateNeeded]);

    const getVisits = (patientId: number) => {
        setLoading(true);
        VisitService.getVisits(patientId).then(result => setVisits(result.data)).finally(() => {
            setLoading(false);
            setUpdateNeeded(false)
        });
    }

    const handleGetVisits = (value: any, option: (DefaultOptionType | DefaultOptionType[])) => {
        setPatientId(value);
        setIsDisabled(false)
        // getVisits(value);
        setUpdateNeeded(true);
    }


    const handleSetVisited = (id?: number) => {
        VisitService.setVisited(id).then(() => MessageService.success())
            .finally(() => setUpdateNeeded(true));
    }

    return (
        <>
            <Card title='Пациент'>
                <Space direction={'horizontal'} size={'large'}>
                    <Select style={{width: "200px"}}
                            disabled={loading}
                            loading={loading}
                            placeholder='Выберете пациента'
                            onChange={handleGetVisits}
                    >
                        {patientSelectors}
                    </Select>
                    <Button type="primary" disabled={isDisabled}
                            onClick={() => createEntry(patientId)}>Записаться</Button>
                </Space>
            </Card>
            <Card title='Посещения' loading={loading}>
                <Row gutter={[32, 32]}>
                    {visits.length > 0 && visits.map((visit) =>
                        <Col span={6} key={visit.id}>
                            <Card title={`Дата приема: ${visit.dateOfReceipt}`}>
                                <Space direction={'vertical'} size={"large"}>
                                    <div>Начало в {visit.startHour}:00</div>
                                    <div> Лечащий
                                        врач {visit.doctor?.lastName} {visit.doctor?.firstName} {visit.doctor?.middleName}</div>
                                    <div>
                                        {visit.isVisited ?
                                            <CheckCircleTwoTone title={"Посетил"}/> :
                                            <Button type="primary" disabled={visit.isVisited}
                                                    onClick={() => {
                                                        handleSetVisited(visit.id)
                                                    }}>
                                                Отметиться
                                            </Button>}
                                    </div>
                                </Space>
                            </Card>
                        </Col>
                    )}
                </Row>

            </Card>
        </>
    );
};
