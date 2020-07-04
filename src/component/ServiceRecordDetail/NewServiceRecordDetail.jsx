import React, { useState, useEffect } from 'react'
import { FiFileText } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import "./NewServiceRecordDetail.scss"


const ServiceRecordDetail = (props) => {
    // console.log(props);

    const [replyData, setReplyData] = useState([])
    const [showAlert, setShowAlert] = useState(false)
    // 點擊後顯示對話欄
    const [userInput, setUserInput] = useState('')
    // 設定對話框
    const handleClick = () => { setShowAlert(!showAlert) }

    // 取對話資訊
    async function getReplyData() {
        const request = new Request('http://localhost:5000/api/customerRoutes/getreplylist', {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json', 'Content-Type': 'application/json',
            })
        })
        const res = await fetch(request)
        const data = await res.json()
        setReplyData(data)
        // 設定資料
        console.log(data);
    }
    async function dataPost() {
        const request = new Request('http://localhost:5000/api/customerRoutes/test', {
            method: 'POST',
            headers: new Headers({
                Accept: 'application/json', 'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                complaintid: props.complaintid,
                responder: props.currentUserData.id,
                replycontent: userInput
            },
            )
        })
        const res = await fetch(request)
        await res.json()
        // 設定資料
        setUserInput('')
        // POST後對話框清空
    }
    // console.log(replyData);
    let Data = replyData.filter(item => item.complaintid === props.complaintid)

    useEffect(() => {
        getReplyData();
    }, [userInput])
    // 預設

    const showtime = (value) => {
        return props.createtime.substr(0, 10).concat(' ').concat(props.createtime.substr(11, 8))
    }

    const complaintTime = (value) => {
        return props.createtime.substr(11, 8)
    }

    const commentTime = (value) => {
        return value.substr(11, 8)
    }
    // console.log('replyData' , replyData);


    return (
        <>
            {/* <span className="list-title-box">
                <div className="number">單號</div>
                <div className="user-id">會員編號</div>
                <div className="user-name">姓名</div>
                <div className="phone-number">連絡電話</div>
                <div className="e-mail">E-mail</div>
                <div className="QA-body">問答內容</div>
                <div className="create-time">建立時間</div>
            </span> */}
            <div className="border-button"></div>
            <span className="list-box">
                <div className="number">{props.complaintid}</div>
                <div className="user-id">{props.memberid}</div>
                <div className="user-name">{props.name}</div>
                <div className="phone-number">{props.phonenumber}</div>
                <div className="e-mail">{props.email}</div>
                <div className="QA-body">
                    <button className="content-btn"
                        onClick={handleClick}><FiFileText className="content-icon" /></button>
                </div>
                <div className="create-time">{showtime(props.createtime)}</div>
            </span>
            {showAlert ?
                <div className="reply-content-body show-modal">
                    <div className="reply-content-body-content">
                        <div className="button-box">
                            <button className="close-button"
                                onClick={handleClick}><AiOutlineClose />
                            </button>
                        </div>
                        <div className="history-body" >
                            <div className={`${props.memberid}` === '1' ? 'history-right' : 'history-left'} >
                                {props.memberid === '1'
                                    ? <div>Admin:<br />{props.complainttextarea} <a >{complaintTime(props.createtime)}</a></div>
                                    : <div>Member:<br />{props.complainttextarea}{complaintTime(props.createtime)}</div>}
                            </div>
                            {/* <div className="history-left">會員-{props.name}：{props.complainttextarea}</div> */}
                            {Data.map((item, index) =>
                                <div className={item.responder === '1' ? 'history-right' : 'history-left'} >
                                    {item.responder === '1'
                                        ? <div className="reply-box">Admin: <br/>{item.replycontent} 
                                        <a className="creat-time">{commentTime(item.replytime)}</a>
                                        </div>
                                        : <div className="reply-box">Member: <br/>{item.replycontent}
                                        <a className="creat-time">{commentTime(item.replytime)}</a>
                                        </div>}
                                </div>
                            )}
                        </div>
                        <div className="textarea-box">
                            <textarea value={userInput} className="textarea-body"
                                onChange={e => setUserInput(e.target.value)} maxlength="300">
                            </textarea>
                        </div>
                        <div className="testPost-btn">
                            <button
                                disabled={userInput === '' ? "disabled" : ""}
                                className="submit-btn"
                                onClick={dataPost}>送出
                        </button>
                        </div>
                    </div>
                </div>
                : ''}
        </>
    )
}
export default ServiceRecordDetail;