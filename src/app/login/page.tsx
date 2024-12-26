import Container from '@/src/Components/Container'
import React from 'react'
import LoginForm from './LoginForm'
import FormWrap from '@/src/Components/FormWrap'
import { getUser } from '@/src/actions/getUser'

export default async function Register() {
    const User = await getUser();
    return (

        <Container>
            <FormWrap>

                <LoginForm isLogged={User} />

            </FormWrap>

        </Container>

    )
}
