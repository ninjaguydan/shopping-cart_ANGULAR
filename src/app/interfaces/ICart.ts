import ICartItem from "./ICartItem";

interface ICart {
	user:string
	items:Array<ICartItem>
}
export default ICart