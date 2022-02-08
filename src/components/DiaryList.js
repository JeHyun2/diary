import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DiaryItem from "./DiaryItem"
import MyButton from "./MyButton"

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
]

const filteOptionList = [
    {value: "all", name: "All"}, 
    {value: "good", name: "Good"}, 
    {value: "bad", name: "Bad"}, 
]

const ControlMenu = ({value, onChange, optionList}) =>{
    return (
    <select className="ControlMenu"
    value={value} 
    onChange={(e)=> onChange(e.target.value)}
    >
        {optionList.map((it, idx) => <option key={idx} value={it.value}> {it.name}</option>)}
    </select>
    )
}

const DiaryList =({diaryList}) => {

    const navigate = useNavigate();

    const [sortType, setSortType] = useState("lastest");
    const [filter, setFilter] = useState("all");

    const getProcessDiaryList = () => {

        const filterCallbBack = (item)=> {
            if (filter === "good"){
                return parseInt(item.emotion) <=3;
            }else {
                return parseInt(item.emotion)>3;
            }
        }
        
        const compare =(a,b) => {
            if(sortType === 'latest'){
                return parseInt(b.date) - parseInt(a.date);
            }
            else {
                return parseInt(a.date) - parseInt(b.date);
            }

        }
        
        const copyList = JSON.parse(JSON.stringify(diaryList))
        const filteredList = filter === "all" ? copyList : copyList.filter((it)=>filterCallbBack(it))

        const sortedList = filteredList.sort(compare);
        return sortedList;
    }

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu value={sortType} onChange={setSortType} optionList= {sortOptionList}></ControlMenu>
                    <ControlMenu value={filter} onChange={setFilter} optionList ={filteOptionList}></ControlMenu>
            
                </div>
                <div className="right_col">
                    <MyButton type={"positive"} text={"새 일기 쓰기"} onClick={() => navigate('/new')}></MyButton>
            
                </div>
            </div>
           
            {getProcessDiaryList().map((it) => (
                <DiaryItem key={it.id} {...it}/>
            ))}
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList;