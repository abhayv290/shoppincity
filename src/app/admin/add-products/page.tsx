import FormWrap from '@/src/Components/FormWrap'
import React from 'react'
import AddFormProduct from './AddFormProduct'
import Container from '@/src/Components/Container'
const AddProducts = async () => {
    return (
        <div className='md:px-12 lg:px-20'>
            <Container>
                <FormWrap>
                    <AddFormProduct />
                </FormWrap>
            </Container>
        </div>
    )
}

export default AddProducts