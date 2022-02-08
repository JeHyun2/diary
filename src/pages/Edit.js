import { useSearchParams } from "react-router-dom";

const Edit =() => {

    const [searchParams, setSearchParams] =useSearchParams();

    const id = searchParams.get("id");
    
    return (
        <div>
            <h1>여기는 Edit</h1>
        </div>
    );
};

export default Edit;