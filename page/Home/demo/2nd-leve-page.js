



import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';

export default class FindPage extends Component {
    static navigationOptions = {
        headerTitle: '二级页面标题'
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.tips}>我是二级页面</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tips: {
        fontSize: 28
    }
});