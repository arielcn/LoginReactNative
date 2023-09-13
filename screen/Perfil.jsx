import { View } from "react-native-web";
import { StyleSheet } from 'react-native';

function Perfil() {

  return(
    <View style={styles.container}>
      <h1>Mi perfil</h1>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Perfil;
