import React from 'react';
import styled from 'styled-components';

function Footer (){
    return (
        <Container>
            <p>Copyright © 2021 Design by Tuan Kiet - A Web Developer</p>
            <p>All right reserved</p>
        </Container>
    )
};

export default Footer

const Container= styled.div`
    color: white;
    text-align: right;
    margin-right: 10px;
    font-style: italic;
`
