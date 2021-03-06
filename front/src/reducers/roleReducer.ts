import { IRole } from "../interfaceRole";
import { TAction } from "../actions/userActionsTypes";


const initialState: IRole[] = [];

export const roleReducer = (
    state: IRole[] = initialState,
    action: TAction
): IRole[] => {
    if (action.type === "SET_ROLES") {
        return action.roles;
    }
    return state;
};