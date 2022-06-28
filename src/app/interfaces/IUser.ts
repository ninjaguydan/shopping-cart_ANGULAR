import IProduct from "./IProduct";

interface IUser {
	id:string
	username:string
	password:string
	cart:Array<IProduct>
}
export default IUser