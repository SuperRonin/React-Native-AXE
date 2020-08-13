import React, { Component } from 'react'
import { WebView } from 'react-native-webview';
export default class MyWeb extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.state.params.title
    })
    componentDidMount(){

    }
    constructor (props) {
        super(props)
        const link = props.uri || this.props.navigation.state.params.link;
        this.state = {
            urlLink: `${decodeURIComponent(link)}?fromto=sss&token={"clienttype":"android","version":"5.3.5.test1","clienttoken":"","devicetoken":"AsEhStKgRVcT0KkijIWn4DbrIpNzFj2ij9c43LQKu7Kc"}&iscontent=1`,
        }
        console.log('========',this.state.urlLink)
    }
    render() {
        return (
            <WebView 
            mixedContentMode={'always'}
            onNavigationStateChange={(event) => {this._urlChange(event)}}
            source={{ uri: this.state.urlLink }} /> 
        )
    }
    _urlChange(e){
        if(e.title.indexOf("http") == -1 && this.props.navigation) this.props.navigation.setParams({ title: e.title || '' })
    }
}


