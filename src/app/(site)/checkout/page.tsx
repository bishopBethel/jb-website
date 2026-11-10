import { redirect } from "next/navigation";

// Checkout happens in the cart; older links land there.
export default function CheckoutPage() {
  redirect("/cart");
}
