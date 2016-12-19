import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';

import HomeView from '../home/Index';
import Login from '../auth/Login';
import PackageView from '../package/Package';
import PackageDetails from '../package/PackageDetails';
import ListCategories from '../categories/ListCategories';
import ListItemsCategory from '../categories/ListItemsCategory';
import DetailsCategory from '../categories/DetailsCategory';
import Search from '../search/Search';
import Authorization from '../../config/Authorization';
import ItemAudioPlayerBottom from '../player/ItemAudioPlayerBottom';
import RowListItemCategory from '../categories/RowListItemCategory';
import SignUp from '../auth/SignUp';
import PurchasedPackage from '../purchase/PurchasedPackage';
import PurchasedContent from '../purchase/PurchasedContent';

import styles from '../../styles/Style';

export default class AppView extends Component {

  static propsType = {
    selectedMenuItem: React.PropTypes.object.isRequired,
    onCategoryItemSelected: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      authorization: null,
      dataAudio: null,
      hasAudio: false
    }
  }

  componentWillMount() {
     AsyncStorage.removeItem('dataAudio');
     let checkAuthorization = AsyncStorage.getItem('authorization');

     let authorization = Authorization.generate();
     if(authorization !== null) {
       this._loadAuthorization(authorization).done();
       this.setState({
         authorizationGet: authorization
       });
     }
   }

  async _loadAuthorization(authorization) {
    try {
      await AsyncStorage.setItem('authorizationGet', authorization);
    } catch (error) {
      console.log('AsyncStorage error: ' + error.message);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props.navigator.navigationContext.addListener('willfocus', (event) => {
      this.getDataAudio().done();
    });
  }

  async getDataAudio() {
    let dataAudio = await AsyncStorage.getItem('dataAudio');
    let hasAudio = await AsyncStorage.getItem('hasAudio');

    this.setState({
      dataAudio: JSON.parse(dataAudio),
      hasAudio: JSON.parse(hasAudio)
    })
  }

  render() {
    var ChildCategoryID = 0;
//console.log(this.props);
    switch(this.props.selectedMenuItem.name) {
      case 'HOME':
        var AppComponent = HomeView;
        var MenuId = this.props.selectedMenuItem.id;
        break;
      case 'PACKAGE':
        var AppComponent = PackageView;
        var MenuId = this.props.selectedMenuItem.id;
        break;
      case 'PACKAGEDETAILS':
          var AppComponent = PackageDetails;
          var MenuId = this.props.selectedMenuItem.id;
          break;
      case 'CATEGORIES':
        var AppComponent = ListCategories;
        var MenuId = this.props.selectedMenuItem.id;
        break;
      case 'ITEMS_CATEGORY':
        var AppComponent = ListItemsCategory;
        var MenuId = this.props.selectedMenuItem.id;
        ChildCategoryID = this.props.selectedMenuItem.childCategoryID;
        break;
      case 'DETAILS':
        var AppComponent = DetailsCategory;
        var MenuId = this.props.selectedMenuItem.id;
        break;
      case 'SEARCH':
        var AppComponent = Search;
        var MenuId = null;
        break;
      case 'LOGIN':
        var AppComponent = Login;
        var MenuId = null;
        break;
      default:
        var AppComponent = HomeView;
        var MenuId = this.props.selectedMenuItem.id;
        break;
    }

    return(
      <View style={styles.container}>
        <AppComponent navigator={this.props.navigator}
                      onCategoryItemSelected={ this.props.onCategoryItemSelected }
                      selectedMenuId={MenuId}
                      childCategoryID={ChildCategoryID}
                      onMenuToogle={this.props.onMenuToogle}
                      {...this.props}
          />
      </View>
    );
  }
}
