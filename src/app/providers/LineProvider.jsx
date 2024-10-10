"use client"
import React, { useEffect } from 'react'
import liff from '@line/liff'
import { useDispatch } from 'react-redux'
import { updateField } from '../redux/slice/userSlice'


const LineProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const lineInit = async () => {
            await liff.init({
                liffId: '2006327247-RMpvpY46',
            })
            if (!liff.isLoggedIn()) {
                liff.login();
            }
            const profile = await liff.getProfile();

            dispatch(updateField(({ field: ['user', 'displayName'], payload: profile.displayName })))
            dispatch(updateField(({ field: ['user', 'pictureUrl'], payload: profile.pictureUrl })))
            dispatch(updateField(({ field: ['user', 'statusMessage'], payload: profile.statusMessage })))
            dispatch(updateField(({ field: ['user', 'userId'], payload: profile.userId })))
        }
        lineInit();
    }, [dispatch])

    return (
        <div>{children}</div>
    )
}

export default LineProvider