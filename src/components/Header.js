import React, { useEffect } from 'react';
import styled from 'styled-components';
import { selectUserName, selectUserPhoto, setUserLogin, setSignOut } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { auth, provider } from "../firebase";
import { useHistory } from "react-router-dom";
function Header() {

    const dispatch=useDispatch();
    const history = useHistory();
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(()=>{
        auth.onAuthStateChanged(async(user)=>{
            if (user){
                dispatch(setUserLogin({
                    name: user.displayName,
                    email: user.email,
                    photo: user.photoURL
                }))
                history.push("/");
            }
        })
    }, [])

    const signIn = ()=>{
        auth.signInWithPopup(provider)
        .then((result)=>{
            let user = result.user;
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL
            }))
            history.push('/');
        })
    }

    const signOut = () =>{
        auth.signOut()
        .then(()=>{
            dispatch(setSignOut());
            history.push("/login");
        })
    }

    return (
        <Nav>
            <Logo src='/images/logo.svg'></Logo>
            { !userName ? (
                <LoginContainer>
                <Login onClick={signIn}> Login </Login>
                </LoginContainer> 
                ):
                <>
                    <NavMenu>
                    <a>
                        <Pic src='/images/home-icon.svg'></Pic>
                        <span>HOME</span>
                    </a>

                    <a>
                    <Pic src='/images/search-icon.svg'></Pic>
                    <span>SEARCH</span>
                    </a>

                    <a>
                    <Pic src='/images/watchlist-icon.svg'></Pic>
                    <span>WATCHLIST</span>
                    </a>

                    <a>
                    <Pic src='/images/original-icon.svg'></Pic>
                    <span>ORIGINAL</span>
                    </a>

                    <a>
                    <Pic src='/images/movie-icon.svg'></Pic>
                    <span>MOVIES</span>
                    </a>

                    <a>
                    <Pic src='/images/series-icon.svg'></Pic>
                    <span>SERIES</span>
                    </a>
                    </NavMenu>
                    <UserImg onClick={signOut} src="/images/myava.jpg" />
                </>
            }
            
        </Nav>
    )
}

export default Header

const Nav = styled.div`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow: hidden;
`
const Logo = styled.img`
    width: 80px;
   

`
const Pic = styled.img`


`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
    a{
        display: flex;
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img
        {
            height: 20px;
        }
        span
        {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
        
            &:after{
                content:"";
                height: 2px;
                background: white;
                position: absolute;
                left: 0;
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left-center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }
        &:hover{
            span:after{
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }

`

const UserImg = styled.img`
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 2px solid white;
        cursor: pointer;
`

const Login = styled.div`
    border: 1px solid #f9f9f9;
    padding: 8px 16px;
    border-radius: 4px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background-color: rgba(0,0,0,0.6);
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover{
        background-color: #f9f9f9;
        color: #000;
        border-color: transparent;
    }
`;

const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`