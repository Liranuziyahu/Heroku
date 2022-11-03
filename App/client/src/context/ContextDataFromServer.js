import React, {useState } from 'react'
import {createContext} from 'react'


export const myContextData = createContext()


const Candidates = ({children}) => {

    //useState
    const [candadians,setCandadians] = useState({})
    const [dataUserLogged , setDataUserLogged] = useState()
    const [toggleAddButton,settoggleAddButton] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [pageExam , setPageExam] = useState(false)

    return (
        <>
        <myContextData.Provider value={{candadians , setDataUserLogged , dataUserLogged , toggleAddButton ,settoggleAddButton,isAuth , setIsAuth , setPageExam,pageExam}} >
        {children}
        </myContextData.Provider>
        </>
    )
}

export default Candidates
