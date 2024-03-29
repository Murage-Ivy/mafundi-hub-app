import { View, Text, StyleSheet, TextInput, Pressable, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { DocumentData, QuerySnapshot, addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { FIREBASE_DB } from 'config/firebaseConfig'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { useHandymanId } from '@/contexts/HandymanIdContext'
import { getItemAsync } from 'expo-secure-store'
import CustomAlert from '@/components/customAlert'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import Loader from '@/components/loader'
import _, { set } from 'lodash'
const ChatApp = () => {
    const [messages, setMessages] = useState<DocumentData[]>([])
    const router = useRouter()
    const [message, setMessage] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const { userState } = useAuth()
    const { handymanId } = useHandymanId()
    const [isError, setError] = useState(false)


    // useLayoutEffect(() => {
    //     const getMessages = async () => {
    //         const chatId = await getItemAsync('docRefId');
    //         try {
    //             const msgCollectionRef = collection(FIREBASE_DB, 'messages', chatId!, 'chats');
    //             const senderMessagesQuery = query(msgCollectionRef, where('senderId', '==', userState?.user_id?.toString()));
    //             const receiverMessagesQuery = query(msgCollectionRef, where('receiverId', '==', userState?.user_id?.toString()));

    //             // Create an array to store the merged messages
    //             let mergedMessages: any[] = [];

    //             // Function to handle snapshot changes
    //             const handleSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
    //                 const messages = snapshot.docs.map((doc) => ({
    //                     id: doc.id,
    //                     ...doc.data()
    //                 }));
    //                 mergedMessages = _.uniq([...mergedMessages, ...messages]);
    //                 // Sort merged messages by createdAt timestamp
    //                 mergedMessages.sort((a, b) => a.createdAt - b.createdAt);
    //                 // Update state with sorted merged messages
    //                 setMessages(mergedMessages);
    //                 setLoading(false)
    //             };
    //             // Subscribe to sender messages
    //             const senderUnsubscribe = onSnapshot(senderMessagesQuery, handleSnapshot);
    //             // Subscribe to receiver messages
    //             const receiverUnsubscribe = onSnapshot(receiverMessagesQuery, handleSnapshot);

    //             // Return cleanup function
    //             return () => {
    //                 senderUnsubscribe();
    //                 receiverUnsubscribe();
    //             };
    //         } catch (error) {
    //             console.error('Firebase error:', error);
    //             setLoading(false)
    //         }
    //     };

    //     getMessages();
    // }, []);

    useLayoutEffect(() => {
        const getMessages = async () => {
            const chatId = await getItemAsync('docRefId');
            try {
                const msgCollectionRef = collection(FIREBASE_DB, 'messages', chatId!, 'chats');
                const senderMessagesQuery = query(msgCollectionRef, where('senderId', '==', userState?.user_id?.toString()));
                const receiverMessagesQuery = query(msgCollectionRef, where('receiverId', '==', userState?.user_id?.toString()));

                let senderMessages: any[] = [];
                let receiverMessages: any[] = [];

                // Function to handle sender snapshot changes
                const handleSenderSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
                    senderMessages = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    updateMergedMessages();
                };

                // Function to handle receiver snapshot changes
                const handleReceiverSnapshot = (snapshot: QuerySnapshot<DocumentData>) => {
                    receiverMessages = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    updateMergedMessages();
                };

                // Function to merge sender and receiver messages, remove duplicates, and update state
                const updateMergedMessages = () => {
                    const mergedMessages = _.uniqBy([...senderMessages, ...receiverMessages], 'id');
                    mergedMessages.sort((a, b) => a.createdAt - b.createdAt);
                    setMessages(mergedMessages);
                    setLoading(false);
                };

                // Subscribe to sender messages
                const senderUnsubscribe = onSnapshot(senderMessagesQuery, handleSenderSnapshot);

                // Subscribe to receiver messages
                const receiverUnsubscribe = onSnapshot(receiverMessagesQuery, handleReceiverSnapshot);

                // Return cleanup function
                return () => {
                    senderUnsubscribe();
                    receiverUnsubscribe();
                };
            } catch (error) {
                setError(true);
                <CustomAlert
                    message='Something went wrong'
                    visible={isError}
                    onClose={() => setError(false)
                    }
                />
                setLoading(false);
            }
        };

        getMessages();
    }, []);

    const sendMessage = async (message: string) => {
        const chatId = await getItemAsync('docRefId')
        const client_id = await getItemAsync('client_id')

        try {
            const msg = message.trim()
            if (msg.length === 0) return
            const _doc = {
                message: msg,
                chatId: chatId,
                senderId: userState?.user_id?.toString(),
                receiverId: userState?.user_role === 'client' ? handymanId : client_id,
                createdAt: serverTimestamp()
            }
            const msgCollectionRef = doc(FIREBASE_DB, 'messages', chatId!)
            const chatRef = collection(msgCollectionRef, 'chats')
            await addDoc(chatRef, _doc)
            setMessage('')
        }
        catch (error) {
            setError(true)

            if (error) {
                <CustomAlert
                    message='Something went wrong'
                    visible={isError}
                    onClose={() => setError(false)
                    } />
            }
            console.log('Firebase error while sending messsage')
        }
    }

    const renderMessage = ({ item }: { item: DocumentData }) => {
        const isSender = item.senderId === userState?.user_id?.toString()
        return (
            <View style={{ padding: 12 }}>
                <View style={[styles.messageContainer, isSender ? styles.userMessageContainer : styles.otherUserMessage]}>
                    <Text style={{
                        color: isSender ? Colors.lighter : Colors.dark,
                        fontSize: 14,
                        letterSpacing: 1.2,
                        fontFamily: 'roboto'
                    }}>{item.message}</Text>
                </View>
                <Text style={{
                    color: Colors.dark,
                    fontSize: 12,
                    letterSpacing: 1.2,
                    fontFamily: 'roboto',
                    textAlign: isSender ? 'right' : 'left',
                    padding: 10,
                }}>{new Date(
                    parseInt(item.createdAt?.seconds) * 1000
                ).toLocaleTimeString('en-US',
                    {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })
                    }</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: Colors.primary
        }}>
            <View style={styles.headerContainer}>
                <Ionicons name='arrow-back' size={24} color={Colors.lighter} onPress={() => router.back()} />
                <Image
                    source={{ uri: userState?.avatar_url! }}
                    placeholder={require('@/assets/images/placeholder.jpg')}
                    placeholderContentFit='cover'
                    style={styles.profile} />
            </View>

            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
                <FlatList data={messages} keyExtractor={(item, index) => item.id} renderItem={renderMessage} contentContainerStyle={{
                    borderTopRightRadius: 50,
                    borderTopLeftRadius: 50,
                }} />
                <View style={styles.inputContainer}>
                    <TextInput
                        autoCapitalize='none'
                        style={styles.messageInput}
                        placeholder="Type a message"
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                        multiline
                    />
                    {
                        message.length > 0 &&
                        <Pressable onPress={() => sendMessage(message)}>
                            <FontAwesome
                                name="send"
                                size={18}
                                color={Colors.lighter}
                                style={styles.sendBtn} />
                        </Pressable>
                    }
                </View>
            </KeyboardAvoidingView>
            <Loader isLoading={loading} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        backgroundColor: Colors.light,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.light,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        height: 80,
        paddingTop: 0,
        backgroundColor: Colors.primary,
    },
    messageInput: {
        flex: 1,
        borderColor: 'black',
        padding: 10,
        marginRight: 10,
        color: 'black',
        letterSpacing: 1.2,
        fontSize: 14,
        borderRadius: 50,
        borderWidth: 1,
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderColor: Colors.secondary,
        borderWidth: 1,
    },
    sendBtn: {
        padding: 10,
        backgroundColor: Colors.primary,
        borderRadius: 50,
    },
    messageContainer: {
        padding: 10,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },

    userMessageContainer: {
        margin: 10,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
        alignSelf: 'flex-end',
        fontSize: 14,
        color: Colors.lighter
    },
    otherUserMessage: {
        color: Colors.dark,
        borderRadius: 10,
        fontSize: 14,
        backgroundColor: Colors.lighter
    }
})
export default ChatApp