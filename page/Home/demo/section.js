import React, { Component } from 'react'
import MySctionList from '../../component/sectionList';

export default class MySction extends Component {
    static navigationOptions = {
        headerTitle: "SectionList"
    }
    render (){
        return (
            <MySctionList></MySctionList>
        )
    }
}
