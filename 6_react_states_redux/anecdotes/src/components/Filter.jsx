import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
    const dispatch = useDispatch();

    const handleChangeFilter = (event) => {
        const filter = event.target.value;
        dispatch(filterChange(filter));
    };

    return (
        <div>
            <input
                onChange={handleChangeFilter}
                placeholder='Filter anecdotes'
            />
        </div>
    );
};

export default Filter;
