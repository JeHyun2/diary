import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import Myheader from "./Myheader";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "../App";

const emotionList = [
    {
        emotion_id : 1,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_descript: '개좋음'
    },
    {
        emotion_id : 2,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_descript: '좋음'
    },
    {
        emotion_id : 3,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_descript: '그냥그럼'
    },
    {
        emotion_id : 4,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_descript: '나쁨'
    },
    {
        emotion_id : 5,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion5.png`,
        emotion_descript: '개나쁨'
    },
]

const getStringDate = (date) => {
    return date.toISOString().slice(0,10);

}
const DiaryEditor =() => {

    const contentRef = useRef();
    const [content, setContent] =useState("");

    const [emotion, setEmotion] = useState();
    const [date, setDate] =useState(getStringDate(new Date()));

    const {onCreate} = useContext(DiaryDispatchContext);

    const handleClickEmote =(emotion) => {
        setEmotion(emotion);
    }

    const navigate = useNavigate();

    const handleSubmit =() => {
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }
        onCreate(date, content, emotion);
        navigate("/", { replace:true })
    };

    return (
        <div className="DiaryEditor">
            <Myheader 
            headText={"새 일기 쓰기"} 
            leftChild={<MyButton text={"뒤로가기"} onClick={()=> navigate(-1)} ></MyButton>}> 
            </Myheader>
            <div>
                <section>
                    <h4>오늘은 언제인가요</h4>
                    <div className="input_box">
                        <input 
                        className="input_date"
                        value={date}
                        onChange={(e)=> setDate(e.target.value)}
                        type="date"></input>
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it)=> (
                           <EmotionItem 
                           key={it.emotion_id} 
                           {...it} 
                           onClick={handleClickEmote}
                           isSelected={it.emotion_id === emotion}
                           ></EmotionItem>
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea 
                        placeholder="오늘은 어땠나"
                        ref={contentRef} 
                        value={content} 
                        onChange={(e)=> setContent(e.target.value)}/>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={()=> navigate(-1)}></MyButton>
                        <MyButton 
                        type= {"positive"}
                        text={'작성완료'} 
                        onClick={handleSubmit}>
                        </MyButton>

                    </div>
                </section>
            </div>
        </div>
    );
}

export default DiaryEditor;