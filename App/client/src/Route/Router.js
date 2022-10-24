import React from 'react'
import { Routes, Route } from "react-router-dom";
import {Admin,Login,DisassembleByCateegoriy,TabelCandidates,Repositore, CreateUser , User , ProtectedRoute , ProtectedUserRoute , UserPage , PageExam , DiagramDishboard} from '../pages/index'


const Router = () => {

    return (
    <Routes>
        <Route  path="/" element={<Login/>}/>
        <Route  path="/new" element={<CreateUser/>}></Route>
        <Route element={<ProtectedRoute/>}>
            <Route path="Administrator" element={<Admin/>}>
                <Route path="" element={<DiagramDishboard/>}/>
                <Route path="Users" element={<UserPage/>}/>
                <Route path="Candidates" element={<TabelCandidates/>}/>
                <Route path="Candidates/:id" element={<PageExam />} />
                <Route path="Repositories" element={<Repositore/>}/>    
                <Route path="Questionnaire" element={<DisassembleByCateegoriy/>}/>
            </Route>
        </Route>
        <Route path="User" element={<ProtectedUserRoute/>}>
            <Route index element={<User/>}/>
            <Route path="Questionnaire" element={<DisassembleByCateegoriy/>}/>
        </Route> 
        <Route path="*" element={(()=> <h1>Page NOT FOUND - 404 :( </h1>) ()}></Route> 
    </Routes>
    )
}
export default Router









