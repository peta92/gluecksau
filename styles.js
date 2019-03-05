import { StyleSheet} from 'react-native';

export default StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: '#faeff1',
    },
    rootView: {
        width: "100%",
        height: "100%",
        padding: 20,
        backgroundColor: '#faeff1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollRootView: {
        flex: 1,
        padding: 20,
        backgroundColor: '#faeff1',
    },
    container_horizontal: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    fitParentImage: {
        flex:1,
        width: null,
        height: null,
    },
    defaultShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
  });