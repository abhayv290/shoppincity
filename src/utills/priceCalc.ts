import type { cartProductType } from "../Components/ProductDetails";
import formatPrice from "./formatPrice";
export default function priceCalc(cartItem: cartProductType[]): string {
    const totalPrice = cartItem.reduce((acc, item) => {
        return acc + (item.price * item.quantity);
    }, 0);

    return formatPrice(totalPrice);
}