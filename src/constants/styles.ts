import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 20,
        paddingBottom: 12,
        position: "relative",
        paddingHorizontal: 10,
    },

    loginSubHeader: {
        color: Colors.lighter,
        alignSelf: "flex-start",
        fontSize: 24,
        fontFamily: "roboto-bold",
        letterSpacing: 2.4,
    },

    loginHeader: {
        color: Colors.lighter,
        fontSize: 14,
        fontFamily: "roboto",
        alignSelf: "flex-start",
        letterSpacing: 1.2,
        lineHeight: 10,
        paddingVertical: 10,
    },

    inputTextField: {
        fontSize: 14,
        letterSpacing: 1.68,
        margin: 12,
        padding: 15,
        borderRadius: 10,
        backgroundColor: Colors.light,
        fontFamily: "roboto",
    },
    authInput: {
        padding: 20,
        width: "100%",
        borderRadius: 18,
        paddingLeft: 50,
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    authIcon: {
        position: "absolute",
        top: 35,
        left: 35,
        zIndex: 1,
    },

    authOption: {
        fontSize: 14,
        letterSpacing: 1.2,
        lineHeight: 10,
        color: Colors.lighter,
        fontFamily: "roboto",
        paddingVertical: 10,
    },

    authButton: {
        width: "100%",
        flexShrink: 0,
        padding: 10,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    authButtonText: {
        fontSize: 20,
        color: Colors.light,
        textAlign: "center",
        padding: 10,
        letterSpacing: 1.8,
        fontFamily: "roboto-bold",
    },
    errorText: {
        color: "red",
        fontFamily: "roboto",
        fontSize: 14,
        letterSpacing: 1.2,
        textAlign: "left",
        alignSelf: "flex-start",
        paddingLeft: 10,
    },
});

export const ClientRegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    titleText: {
        fontFamily: "roboto-medium",
        fontSize: 14,
        letterSpacing: 1.6,
        textAlign: "center",
        color: Colors.lighter,
    },
    titleContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        padding: 20,
    },
    scroll: {
        width: "100%",
        height: "100%",
    },
    subContainer: {
        flexGrow: 1,
        backgroundColor: Colors.light,
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    textInput: {
        borderColor: Colors.secondary,
        borderWidth: 1,
        width: 360,
        borderRadius: 40,
    },

    submitBtn: {
        backgroundColor: Colors.primary,
        borderRadius: 20,
        padding: 20,
        width: 360,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
    },
    submitBtnText: {
        color: Colors.lighter,
        fontFamily: "roboto-medium",
        fontSize: 18,
        letterSpacing: 1.8,
        textAlign: "center",
    },
    contentContainer: {
        flexGrow: 1,
        alignItems: "center",
        marginTop: 10,
        backgroundColor: Colors.light,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
});

export const clientProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    subContainer: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 10,
    },
    scroll: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.light,
        paddingHorizontal: 10,
    },

    contentContainer: {
        height: "80%",
    },

    textInput: {
        borderBottomWidth: 1,
        padding: 10,
        width: 150,
        borderColor: Colors.secondary,
        letterSpacing: 1.2,
        marginHorizontal: 10,
    },
    cameraContainer: {
        position: "absolute",
        top: "6%",
        right: "36%",
        bottom: 0,
        backgroundColor: Colors.primary,
        borderRadius: 30,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export const HandymanProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        overflow: "scroll",
    },
    scroll: {
        width: "100%",
        height: "100%",
    },
    subContainer: {
        backgroundColor: Colors.light,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingBottom: 100,
    },
    cameraContainer: {
        position: "absolute",
        bottom: "15%",
        right: "0%",
        backgroundColor: Colors.primary,
        borderRadius: 30,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 30,
        fontFamily: "roboto",
        letterSpacing: 1.4,
        width: 350,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    textArea: {
        paddingTop: 0,
        height: 100,
        marginTop: 20,
    },
    selectBtnStyles: {
        width: 160,
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderRadius: 10,
        backgroundColor: "transparent",
    },
    textContainer: {
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
    },
    submitBtn: {
        marginTop: 10,
        padding: 20,
        borderRadius: 20,
        width: 360,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    submitBtnText: {
        color: Colors.lighter,
        fontFamily: "roboto-medium",
        fontSize: 18,
        letterSpacing: 1.8,
        textAlign: "center",
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        marginTop: 20,
        paddingBottom: 20,
        paddingTop: 25,
        backgroundColor: Colors.light,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 12,
    },
});

export const handymanRegisterStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        overflow: "scroll",
    },
    scroll: {
        width: "100%",
        height: "100%",
    },
    subContainer: {
        backgroundColor: Colors.light,
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingBottom: 30,
    },
    textInput: {
        borderColor: Colors.secondary,
        borderWidth: 1,
        width: 350,
        borderRadius: 40,
    },
    textArea: {
        paddingTop: 0,
        height: 100,
        borderRadius: 10,
    },
    submitBtn: {
        padding: 20,
        borderRadius: 40,
        width: 350,
        alignItems: "center",
        justifyContent: "center",
    },
    submitBtnText: {
        color: Colors.lighter,
        fontFamily: "roboto-medium",
        fontSize: 18,
        letterSpacing: 1.8,
        textAlign: "center",
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        overflow: "scroll",
        marginTop: 20,
        paddingBottom: 20,
        paddingTop: 25,
        backgroundColor: Colors.light,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 20,
    },
});

export const taskFormStyles = StyleSheet.create({
    safeareaStyle: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingTop: 20,
        alignItems: "center",
    },
    scroll: {
        width: "100%",
        height: "100%",
    },
    contentStyle: {
        flexGrow: 1,
        alignItems: "center",
        marginTop: 12,
    },
    taskStyles: {
        width: 180,
        height: 60,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderRadius: 40,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingBottom: 50,
        marginTop: 25,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    headerStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingBottom: 50,
    },
    headerTextStyle: {
        fontFamily: "roboto-bold",
        fontSize: 16,
        letterSpacing: 1.8,
        color: Colors.secondary,
    },

    textInput: {
        borderColor: Colors.secondary,
        borderWidth: 1,
    },
    viewTextContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingBottom: 50,
    },
    inputField: {
        width: 180,
        fontFamily: "roboto",
        fontSize: 14,
        height: 60,
        borderRadius: 40,
        padding: 15,
        borderColor: Colors.secondary,
        marginBottom: 10,
        letterSpacing: 1.2,
    },
    textarea: {
        width: 350,
        height: 120,
        borderRadius: 10,
        padding: 15,
        borderColor: Colors.secondary,
        fontFamily: "roboto",
        marginBottom: 10,
        letterSpacing: 1.2,
    },
});

export const categoryListStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatListStyle: {
        paddingVertical: 10,
        paddingBottom: 120,
        paddingHorizontal: 10,
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
    categoryContainer: {
        flex: 1,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        borderColor: Colors.light,
    },
    categoryText: {
        fontSize: 14,
        fontFamily: "roboto-medium",
        letterSpacing: 1.2,
        textAlign: "center",
        color: Colors.lighter,
    },
});

export const clientHomeStyles = StyleSheet.create({
    safeareaView: {
        flex: 1,
        paddingTop: 40,
        backgroundColor: Colors.primary,
    },
    container: {
        flex: 1,
    },
    headerContainer: {
        marginTop: 20,
        marginHorizontal: 20,
    },

    notification: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 20,
    },
    iconView: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.lighter,
        borderRadius: 16,
        margin: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconText: {
        fontSize: 14,
        fontFamily: "roboto-medium",
        color: Colors.secondary,
        marginBottom: 10,
        letterSpacing: 1,
    },
    headerText: {
        fontSize: 20,
        fontFamily: "roboto-bold",
        color: Colors.lighter,
        marginBottom: 10,
        letterSpacing: 1.8,
        lineHeight: 30,
    },
    catergoryHeader: {
        paddingHorizontal: 20,
        fontSize: 16,
        fontFamily: "roboto-medium",
        letterSpacing: 1.2,
        color: Colors.lighter,
    },
});

export const defaultJobStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        flex: 1,
    },
    headerStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },
});

export const jobListStyle = StyleSheet.create({
    container: {
        flex: 1,
    },
    jobContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.lighter,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    jobText: {
        fontSize: 14,
        fontFamily: "roboto",
        letterSpacing: 1,
        padding: 5,
    },
    proposalContainer: {
        alignSelf: "flex-end",
    },
    jobBody: {
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
        paddingBottom: 10,
        marginBottom: 10,
    },
    jobFooter: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});

export const appointmentStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: Colors.primary,
    },
    icon: {
        paddingLeft: 20,
        marginVertical: 20,
    },
    image: {
        width: 200,
        height: 200,
    },
    title: {
        fontSize: 16,
        color: Colors.lighter,
        fontFamily: "roboto-medium",
        fontWeight: "bold",
        letterSpacing: 1.2,
        alignSelf: "flex-start",
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    scrollView: {
        width: "100%",
    },
    scrollViewContent: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
    },
    calendarContainer: {
        backgroundColor: Colors.lighter,
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary,
        marginVertical: 10,
        padding: 10,
        width: "45%",
        letterSpacing: 1.2,
    },
    button: {
        backgroundColor: Colors.secondary,
        padding: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        display: "flex",
        flexDirection: "row",
    },
    buttonTitle: {
        color: Colors.lighter,
        fontFamily: "roboto-medium",
        fontWeight: "bold",
        letterSpacing: 1.2,
    },
    buttonContainer: {
        paddingHorizontal: 20,
        marginVertical: 10,
        width: "100%",
        justifyContent: "space-between",
    },
    textArea: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.primary,
        marginVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        letterSpacing: 1.2,
    },
    inputContainter: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
    },
    textContainer: {
        marginBottom: 150,
        width: "100%",
        justifyContent: "space-between",
    },
});
