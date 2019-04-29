import React, { Component } from 'react';

class OnlineList extends Component {
    renderUsers() {
        return (
            <ul>
                {this.props.users.map((user, index) => {
                    if (user.id === this.props.currentChatUser.id) {
                        return (
                            <OnlineListItem key={index} presenceState="online">
                            {user.name} (You)
                            </OnlineListItem>
                        );
                    }
                    return (
                        <OnlineListItem key={index} presenceState={user.presence.state}>
                            {user.name}
                        </OnlineListItem>
                    );
                })}
            </ul>
        );
    }

    render() {
        if (this.props.users) {
            return this.renderUsers();
        } 
        return <p>Loading...</p>;
    }
}

const OnlineListItem = (props) => {
    const styles = {
        li: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 2,
        paddingBottom: 2,
        },
        div: {
        borderRadius: '50%',
        width: 11,
        height: 11,
        marginRight: 10,
        },
    };
    return (
        <li style={styles.li}>
            <div style={{
                    ...styles.div,
                    backgroundColor:
                    props.presenceState === 'online' ? '#539eff' : '#414756',
                }}
            />
            {props.children}
        </li>
    );
};

export default OnlineList;