import {UserType} from "../redux/users-reducer";

export const updateObjectInArray = (items: Array<UserType>, itemId: number | string, objPropName: string, newObjProps: any) => {

    return items.map(i => {
        // @ts-ignore
        return i[objPropName] === itemId ? {...i, ...newObjProps} : i
    })
}
