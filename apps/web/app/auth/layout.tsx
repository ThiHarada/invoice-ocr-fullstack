"use client"

import React, { PropsWithChildren } from "react";
import styled from "styled-components";

const AuthLayout = ({children} : PropsWithChildren) => {
    return (
        <LayoutStyle>
            {children}
        </LayoutStyle>
    )
}

export default AuthLayout;

const LayoutStyle = styled.div`
    background-image: linear-gradient(45deg, var(--color-primary), var(--color-auxiliary));
    background-position: fixed;
    height:100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

`