const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
   if(index > 0) {
     return (
       <TouchableHighlight
         underlayColor="transparent"
         onPress={() => { if (index > 0) { navigator.pop() } }}>
         <Text style={ styles.leftNavButtonText }>Back</Text>
       </TouchableHighlight>)
   }
   else { return null }
 },
 RightButton(route, navigator, index, navState) {
   if (route.onPress) return (
     <TouchableHighlight
        onPress={ () => route.onPress() }>
        <Text style={ styles.rightNavButtonText }>
             { route.rightText || 'Right Button' }
        </Text>
      </TouchableHighlight>)
 },
 Title(route, navigator, index, navState) {
   return <Text style={ styles.title }>MY APP TITLE</Text>
 }
}
export default NavigationBarRouteMapper;
