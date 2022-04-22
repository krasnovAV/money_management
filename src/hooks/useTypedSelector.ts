import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../Store/Redusers/rootReducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

//создали свой хук userTypedSelector, так как обычный useSelector плохо работает с типами