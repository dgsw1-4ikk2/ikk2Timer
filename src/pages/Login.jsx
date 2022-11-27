import { useCallback, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import LoginHome from "../LoginHome";
import { useDispatch } from "react-redux";

const Bg = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
`;

const WhiteBar = styled.div`
  width: 650px;
  height: 600px;
  margin: 50px auto;
  background-color: white;
  border-radius: 1.2rem;
  align-items: center;
  justify-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;
const Title = styled.div`
  font-weight: bold;
  color: black;
  font-size: 50px;
  position: relative;
  font-family: "work sans";
  left: 245px;
`;
const IdPass = styled.div`
  margin: 50px auto;
`;
const IdDesign = styled.input`
  color: black;
  outline: none;
  border: none;
  position: relative;
  left: 170px;
  margin: 70px 0 15px 0;
  font-family: "work sans";
  width: 300px;
  font-size: 18px;
  &::-webkit-input-placeholder {
    opacity: 1;
    transition: opacity 0.25s ease-out;
  }
  &:hover::-webkit-input-placeholder,
  &:focus::-webkit-input-placeholder {
    opacity: 0;
  }
`;
const Border1 = styled.div`
  border-bottom: 3px solid #cc99ff;
  width: 55%;
  position: relative;
  left: 150px;
`;

const Border2 = styled.div`
  border-bottom: 3px solid #cc99ff;
  width: 55%;
  position: relative;
  left: 150px;
`;
const PasswordDesign = styled.input`
  font-family: "work sans";
  color: black;
  outline: none;
  margin: 70px 0 15px 0;
  border: none;
  position: relative;
  left: 170px;
  width: 300px;
  font-size: 18px;
  &::-webkit-input-placeholder {
    opacity: 1;
    transition: opacity 0.25s ease-out;
  }
  &:hover::-webkit-input-placeholder,
  &:focus::-webkit-input-placeholder {
    opacity: 0;
  }
`;

const LoginBtn = styled.button`
  transition: opacity 0.25s ease-out;
  &:hover {
    opacity: 0.8;
  }
  color: black;
  font-size: 1.1rem;
  padding-bottom: 1.5rem;
  margin-top: 70px;
  padding-top: 25px;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  width: 300px;
  font-family: "work sans";
  background-repeat: no-repeat;
  background-color: #cc99ff;
`;
const Screen = styled.div`
   @media screen and (max-width: 768px){
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
}
`;

const NotLogin = styled.div`
  margin-top:30px;
  text-align:center;
`;
export default function Login() {
  const [input1, SetInput1] = useState("");
  const [input2, SetInput2] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin,SetIsLogin]=useState(false);
  const [loading, setLoading] = useState(false);
  const Id_onchange = useCallback(
    (e) => {
      SetInput1(e.target.value);
    },
    [input1]
  );

  const Password_onchange = useCallback(
    (e) => {
      SetInput2(e.target.value);
    },
    [input2]
  );
  const onClick = useCallback(
    (e) => {
      if (input1 && input2) {
        let data = {
          name: input1,
          password: input2,
        };
        axios
          .post("/api/auth/login", data,{
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(function (response) {
            console.log(response);
            if (response.data) {
              localStorage.setItem('X-AUTH-TOKEN', response.data);
            }
            SetIsLogin(true);
            return (isLogin === true? <LoginHome/> : <Login/>)
          })
          .catch(function (error) {
            console.log(error);
            alert('ㅄㅋ');
          });
        SetInput1("");
        SetInput2("");
      } else alert("제대로 입력해주세요!");
      
    },
    [input1, input2]
  );

  // const onClick = async ()=>{
  //   if (input1 && input2) {
  //     try{
  //       let data = {
  //         name: input1,
  //         password: input2,
  //       };
  //       const response=await axios.post("/api/auth/login",data);
  //       console.log(response.data);
  //     }
  //     catch(e){
  //       console.log(e);
  //     }
  //   }
  // };
  return (
    <Screen className="wrap">
      <style>{"body { background-color: #E5CCFF; }"}</style>
      <Bg>
        <WhiteBar className="fadein">
          <IdPass>
            <Title className="fadein">로그인</Title>
            <div className="fadein">
              <IdDesign
                type="text"
                placeholder="Enter your ID"
                name="name"
                value={input1}
                onChange={Id_onchange}
              />
            </div>
            <Border1 className="fadein" />
            <div className="fadein">
              <PasswordDesign
                type="password"
                placeholder="Enter your password"
                name="password"
                value={input2}
                onChange={Password_onchange}
              />
            </div>
            <Border2 className="fadein" />
            <LoginBtn disabled={loading} type="submit" className="fadein" onClick={onClick}>
              Login
            </LoginBtn>

            <NotLogin className="fadein">
              <a href='./signup'>
                회원가입
              </a>
            </NotLogin>
          </IdPass>
        </WhiteBar>
      </Bg>
    </Screen>
  );
}
