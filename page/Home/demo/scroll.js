import React, { Component } from 'react'
import MyScroll from '../../component/scrollView';

export default class scrollList extends Component {
    static navigationOptions = {
        headerTitle: "scrollView"
    }
    render (){
        return (
            <MyScroll></MyScroll>
        )
    }
}
