import {message} from 'antd';

export class MessageService {
    static success() {
        message.success('Выполнено успешно');
    }

}
