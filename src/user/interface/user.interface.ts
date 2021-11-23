import { Document } from 'mongoose'

export default interface UserInterface  extends Document{
    name: string,
    lastName: string,
    age: number,
    email: string 
}