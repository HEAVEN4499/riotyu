import React from 'react';
import { Icon, Menu } from 'semantic-ui-react'

export default class NavBar extends React.Component {
    render() {
        return (
            <Menu icon>
                <Menu.Item name="ellipsis"><Icon name="ellipsis horizontal"/></Menu.Item>
                <Menu.Item name="title">发糖助手</Menu.Item>
                <Menu.Item name="role"><Icon name="address card outline"/></Menu.Item>
            </Menu>);
    }
}