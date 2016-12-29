import React, {Component} from 'react';
import { Text, View, StyleSheet, ListView, TouchableOpacity, TouchableHighlight, Image, AsyncStorage, Dimensions, Modal, TextInput, Alert } from 'react-native';
import styles from '../../styles/Style';
import RowListItemCategory from '../categories/RowListItemCategory';
import DetailsCategory from '../categories/DetailsCategory';
import Promotion from './Promotion';
import NavigationBar from 'react-native-navbar';
import { Icon } from 'react-native-elements';
import constants from '../../constants/Types';
const { REQUEST_PACKAGE_LIST_CONTENT_BY_PACKAGE, REQUEST_PAYMENT_PROMOTION_URL } = constants;
const {width, height} = Dimensions.get('window');
const imageWidth = (width/2) - 5;
const imageHeight = (width/2)/16*9;

export default class PackageDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      authorization: '',
      modalVisible: false,
      text: '',
      listItemRelates: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    }
  }

  componentWillMount() {
    this.getItemRelates().done();
  }

  async getItemRelates() {
    let authorization = await AsyncStorage.getItem('authorization');
    try {
      authorization = JSON.parse(authorization);

      let response = await fetch(REQUEST_PACKAGE_LIST_CONTENT_BY_PACKAGE + this.props.route.items[0].pk_id , {
                                  method: 'GET',
                                  headers: {
                                    'DateTime': authorization.DateTime,
                                    'RequestToken': authorization.RequestToken
                                  }
                                });
      let responseJson = await response.json();
      this.setState({
        packageDetails: this.props.route.items[0],
        listItemRelates: this.state.listItemRelates.cloneWithRows(responseJson.groups),
        loaded: !this.state.loaded,
        authorization: authorization,
      });
    } catch(error) {
      console.error(error);
    }
  }

  renderLogoNavBar() {
    return(
      <TouchableOpacity onPress= {() => this.props.navigator.popToTop()}>
          <Text style={styles.logo}>SBTN</Text>
      </TouchableOpacity>
    )
  }
  renderBackButton() {
    return(
      <View style={styles.iconBack}>
        <Icon
          name='angle-left'
          type='font-awesome'
          color='#fff'
          size={30}
          onPress={() => this.props.navigator.jumBack()} />
      </View>
    )
  }

  renderNavIconSearch() {
    return(
      <View style={styles.iconSearch}>
        <Icon
          name='search'
          type='font-awesome'
          color='#fff'
          size={15}
          onPress={() => this.bindOnPress()} />
      </View>
    )
  }

  bindOnDetail(id, mode) {

    this.setState({
      hasRadio: false
    })

    this.props.navigator.push({
                                id: id,
                                component: DetailsCategory,
                                navigationBar: <NavigationBar title={this.renderLogoNavBar()}
                                                  statusBar = {{ hidden: true }}
                                                  leftButton = { this.renderBackButton(id, mode) }
                                                  style={styles.navigationBar}
                                                  rightButton = { this.renderNavIconSearch(mode) } />
                              })
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  packageDetails(packageDetails) {
    return(
      <View style={styles.column}>
        <Text style={[styles.title, styles.white]}>{packageDetails.name}</Text>
        <View style={styles.row}>
          <Image source={{uri: packageDetails.image}} style={{width: width/3, height: width/3, borderRadius: width/6}} />

          <View style={styles.column}>
            <Text style={styles.white}>{packageDetails.group_name}</Text>
            <Text style={styles.white}>{packageDetails.description}</Text>

              {
                packageDetails.promotion == 1 ?
                  <TouchableOpacity onPress={() => { this.setModalVisible(true) }}>
                    <View style={styles.wrapperBtnPackage}><Text style={[styles.white, styles.btnPackage]}>Redeem Code</Text></View>
                  </TouchableOpacity>
                :
                  <TouchableOpacity>
                    <View><Text style={styles.white}>{packageDetails.price}</Text></View>
                  </TouchableOpacity>
              }
          </View>
        </View>

        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.modalContainer}>
          <View style={[styles.modalWrapper, {width: width - 40, height: 200}]}>
            <Text style={styles.white}>Add your promotion code to view this content</Text>

            <TextInput style={styles.txtPromotion} onChangeText={(text) => this.setState({text})} />

            <View style={[styles.row, styles.centering]}>
              <TouchableHighlight onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
                <Text style={styles.white}>Cancel</Text>
              </TouchableHighlight>

              <TouchableHighlight onPress={() => {
                this.addPromotionCode(this.state.text)
              }}>
                <Text style={styles.white}>Add Code</Text>
              </TouchableHighlight>
            </View>

          </View>
         </View>
        </Modal>

      </View>
    );
  }

  addPromotionCode(promotionCode) {
    return(
      !promotionCode ?
        Alert.alert(
          'Message',
          'Please fill in the Promotion Code',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
      : this.checkPromotion(promotionCode)
    )
  }

  async checkPromotion(promotionCode) {
    try {
      console.log(this.state.authorization);
      let response = await fetch(REQUEST_PAYMENT_PROMOTION_URL + promotionCode , {
                                  method: 'GET',
                                  headers: {
                                    'DateTime': this.state.authorization.DateTime,
                                    'RequestToken': this.state.authorization.RequestToken,
                                    'Authorization': this.state.authorization.Authorization
                                  }
                                });
      let responseJson = await response.json();
      this.displayMessage(responseJson).done();
    } catch(error) {
      console.error(error);
    }
  }

  async displayMessage(data) {
    return(
      data.error != 0 ?
        Alert.alert(
          'Message',
          data.message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        )
      : null
    )
  }

  renderRowItem(rowData) {

    return(
        <View style={styles.container}>
            <View style={[styles.sectionHeader]}>
                <Text style={styles.sectionText}>{rowData.name}</Text>
              {
                rowData.items.length > 6 ?
                  <TouchableOpacity style={styles.textRight} onPress = { () => this.props.navigator.push({
                                              id: this.props.selectedMenuId,
                                              component: RowListItemCategory,
                                              childCategoryID: rowData.id,
                                              moreItemsData: rowData.items,
                                              navigationBar: <NavigationBar title={this.renderLogoNavBar()}
                                                                statusBar = {{ hidden: true }}
                                                                leftButton = { this.renderBackButton() }
                                                                style={styles.navigationBar}
                                                                rightButton = { this.renderNavIconSearch() } />
                                            }) }>
                      <Text style={styles.btnMore}>More</Text>
                  </TouchableOpacity>
                : null
              }
            </View>

            <View style={[styles.blocks]}>
              {
                rowData.items.map((data, index) => {
                  const visibility = index > 5 ? styles.hidden : { width: imageWidth, height: imageHeight + 20};
                  return(
                    <View key={this.props.id + '_' + index} style={visibility}>
                      <TouchableOpacity onPress = { () => this.bindOnDetail(data.id, rowData.mode) }>
                        <View style={[styles.thumbnailContainer, styles.column]}>
                          <Image source={{uri: data.image}} style={{ width: imageWidth, height: imageHeight }} />
                          <View style={styles.titleContainer}>
                            <Text style={styles.title} ellipsizeMode='tail' numberOfLines={1}>{data.name}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )
                })
              }
            </View>
        </View>
      )
  }

  render(){
    return(
      <View style={[styles.container]}>
        {
          this.state.loaded ?
            <View>
              { this.packageDetails(this.state.packageDetails) }
              <ListView dataSource = {this.state.listItemRelates} renderRow = {this.renderRowItem.bind(this)} />
           </View>
          : null
        }
      </View>
    )
  }
}
