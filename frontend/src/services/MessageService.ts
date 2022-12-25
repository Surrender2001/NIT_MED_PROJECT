import {message} from 'antd';

export class MessageService {
    static success() {
        message.success('Выполнено успешно');
    }

    static warn(text: string) {
        message.warning(text);
    }
}
