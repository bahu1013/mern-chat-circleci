import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Chatkit from '@pusher/chatkit-client';

import { 
    API_URL, INSTANCE_LOCATOR, ROOM_ID 
} from '../../config';

import authActions from "../../actions/auth";
import Header from "../../components/Header";
import MessageList from '../../components/MessageList';
import SendMessageForm from '../../components/SendMessageForm';
import TypingIndicator from '../../components/TypingIndicator';
import OnlineList from '../../components/OnlineList';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentChatUser: {},
            currentRoom: {},
            messages: [],
            usersWhoAreTyping: []
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this);
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: INSTANCE_LOCATOR,
            userId: this.props.login.currentUser.chat_id,
            tokenProvider: new Chatkit.TokenProvider({
                url: `${API_URL}/users/authenticate`,
            }),
        });

        chatManager.connect().then(currentChatUser => {
            this.setState({ currentChatUser });
            return currentChatUser.subscribeToRoom({
                roomId: ROOM_ID,
                messageLimit: 100,
                hooks: {
                    onMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message]
                        });
                    },
                    onUserStartedTyping: user => {
                        console.log(user);
                        this.setState({
                            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                        });
                    },
                    onUserStoppedTyping: user => {
                        const usersWhoAreTyping = this.state.usersWhoAreTyping.filter(username => username !== user.name);
                        this.setState({ usersWhoAreTyping });
                    },
                    onPresenceChange: () => this.forceUpdate(),
                },
            });
        }).then(currentRoom => {
            this.setState({ currentRoom });
        }).catch(error => console.error('error', error));
    }

    sendMessage(text) {
        this.state.currentChatUser.sendMessage({
            text,
            roomId: this.state.currentRoom.id,
        });
    }

    sendTypingEvent() {
        this.state.currentChatUser.isTypingIn({ roomId: this.state.currentRoom.id }).catch(error => console.error('error', error));
    }

    render() {
        const styles = {
            container: {
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            },
            chatContainer: {
                display: 'flex',
                flex: 1,
            },
            whosOnlineListContainer: {
                width: '300px',
                flex: 'none',
                padding: 20,
                backgroundColor: '#2c303b',
                color: 'white',
            },
            chatListContainer: {
                padding: 20,
                width: '85%',
                display: 'flex',
                flexDirection: 'column',
            },
        };
        return (
            <div>
                <Header />
                <div style={styles.container}>
                    <div style={styles.chatContainer}>
                        <aside style={styles.whosOnlineListContainer}>
                            <OnlineList currentChatUser={this.state.currentChatUser} users={this.state.currentRoom.users} />
                        </aside>
                        <section style={styles.chatListContainer}>
                            <MessageList messages={this.state.messages} style={styles.chatList} />
                            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
                            <SendMessageForm onSubmit={this.sendMessage} onChange={this.sendTypingEvent} />
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        login: state.login,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    ...authActions
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);