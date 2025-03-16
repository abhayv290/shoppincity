import Container from '@/src/Components/Container'
import React from 'react'
import RegisterForm from './RegisterForm'
import FormWrap from '@/src/Components/FormWrap'
import { getUser } from '@/src/actions/getUser'

export default async function Register() {
    const User: any = await getUser();
    return (

        <Container>
            <FormWrap>

                <RegisterForm isLogged={User} />

            </FormWrap>

        </Container>

    )
}
