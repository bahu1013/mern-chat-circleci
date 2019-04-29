import http from './httpHelper';

export default class AuthSvc {
    static login(email, password) {
        return http(false).post('/users/login', { email, password });
    }

    static loadMe() {
        return http().get('/users/profile');
    }

    static logout() {
        return http().post('/users/logout');
    }

    static register(newUser) {
        return http(false).post('/users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            chat_id: newUser.chat_id,
            email: newUser.email,
            password: newUser.password
        });
    }

    static updateProfile(updatedUser) {
        return http().post('/users/profile', {
            _id: updatedUser._id,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            email: updatedUser.email,
        });
    }

    static updatePassword(passwords, _id, token) {
        return http().post('/users/profile', {
            _id,
            current_password: passwords.current_password,
            new_password: passwords.new_password,
            token
        });
    }
}