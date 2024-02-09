import { View, Text, Pressable, FlatList, } from 'react-native'
import React, { useRef, useState } from 'react'
import { JobPropType } from '@/types/job'
import Colors from '@/constants/Colors'
import {  FontAwesome5 } from '@expo/vector-icons'
import Proposal from '@/app/screens/proposal'
import { jobListStyle } from '@/constants/styles'
import { TaskProvider, useTask } from '@/context/TaskContext'
import { useAuth } from '@/context/AuthContext'
import NotFound from './not-found'
import { useRouter } from 'expo-router'

const JobList = () => {
    const { tasks, setPageNumber } = useTask()
    const router = useRouter()
    const [visible, setVisible] = useState<boolean>(false)
    const jobRef = useRef<FlatList<JobPropType> | null>(null)
    const { userState } = useAuth()

    const handlePress = (jobId: number) => {
        if (userState?.user_role === 'handyman') {
            router.push(`/job-listing/${jobId}`)
        }
    }
    const renderMyJobs = ({ item }:
        {
            item: JobPropType
        }) => {
        return (
            <Pressable onPress={() => handlePress(item.id!)}>
                <View key={item.id} style={jobListStyle.jobContainer}>
                    <Text
                        onPress={() => setVisible(!visible)}
                        style={[jobListStyle.jobText,
                        { textAlign: 'right' }]}>
                        {userState?.user_role === 'client' ? "View Proposals" : null}
                    </Text>
                    <View style={jobListStyle.jobBody}>
                        <Text style={
                            [jobListStyle.jobText,
                            {
                                fontSize: 18,
                                fontFamily: "roboto-bold",
                                letterSpacing: 1.8
                            }]}>
                            {item?.job_title}
                        </Text>
                        <Text style={
                            [jobListStyle.jobText,
                            { fontFamily: 'roboto-medium' }]}>
                            {item?.job_category}
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center'
                        }}>
                            <FontAwesome5 name="location-dot" size={16} color={Colors.secondary} />
                            <Text style={[jobListStyle.jobText, { fontSize: 10 }]}>
                                {item.job_location}
                            </Text>
                        </View>
                    </View>
                    <View style={jobListStyle.jobFooter}>
                        <Text style={[jobListStyle.jobText, { fontSize: 12 }]}>{item?.job_price}</Text>
                        <Text style={[jobListStyle.jobText, { fontSize: 12 }]}>{item?.duration_label}</Text>
                    </View>
                </View>
            </Pressable >
        )
    }
    return (
        <>
            <TaskProvider>
                {
                    tasks?.length === 0 ?
                        <NotFound />
                        :
                        <>
                            <FlatList
                                ref={jobRef}
                                data={tasks || []}
                                renderItem={renderMyJobs}
                                style={{ width: '100%', height: '100%', padding: 10 }}
                                contentContainerStyle={{ paddingBottom: 120 }}
                            />
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                position: 'absolute',
                                top: '85%',
                            }}>
                                <Pressable style={{
                                    alignSelf: 'flex-end',
                                    paddingBottom: 100,
                                    paddingHorizontal: 20,
                                }} onPress={() => {
                                    setPageNumber!((prevPage) => prevPage === 1 ? 1 : prevPage - 1)
                                }}>
                                    <Text style={{ color: Colors.secondary }}>
                                        Previous
                                    </Text>
                                </Pressable>

                                <Pressable style={{
                                    alignSelf: 'flex-end',
                                    paddingBottom: 100,
                                    paddingHorizontal: 20,
                                }} onPress={() => {
                                    setPageNumber!((prevPage) => prevPage + 1)
                                }}>
                                    <Text style={{ color: Colors.secondary }}>
                                        Next
                                    </Text>
                                </Pressable>

                            </View>
                            <Proposal visible={visible} setVisible={setVisible} />
                        </>
                }
            </TaskProvider>
        </>
    )
}



export default JobList