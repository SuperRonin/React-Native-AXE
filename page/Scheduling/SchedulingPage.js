import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    BackHandler,
    ToastAndroid
} from 'react-native';

export default class SchedulingPage extends Component {
    // static navigationOptions = {
    //     tabBarLabel: '行程',
    //     tabBarIcon: ({focused}) => {
    //         if (focused) {
    //             return (
    //                 <Image style={styles.tabBarIcon} source={{uri: 'https://www.bus365.com/public/www/images/icon_home_sel.png'}}/>
    //             );
    //         }
    //         return (
    //             <Image style={styles.tabBarIcon} source={{uri: 'https://www.bus365.com/public/www/images/icon_home_nor.png'}}/>
    //         );
    //     },
    // };
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>这是行程页</Text>
            </View>
        );
    }
    /**
     * 物理按键返回
     */
    onBackButtonPressAndroid = () => {
        if (this.props.navigation.isFocused()) {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                return false;
            }
            this.lastBackPressed = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
            return true;
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarIcon: {
        width: 21,
        height: 21,
    }
});