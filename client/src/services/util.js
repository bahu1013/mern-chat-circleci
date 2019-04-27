import _ from 'lodash';

export default class Util {
    // check email format
    static checkMail(mail) {
        // eslint-disable-next-line no-useless-escape
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(mail)) return true;
        return false;
    }

    // checks null or empty value
    static checkNullOrEmpty(value) {
        return _.isEmpty(_.trim(value)) || _.isNil(value);
    }
}