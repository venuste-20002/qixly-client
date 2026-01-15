'use client';

import { ChevronLeft, X, Plus, Minus, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import "swiper/css/pagination";
import { useState, useEffect, useCallback } from 'react';
import { 
  getUserCarts, 
  updateCartItem, 
  removeCartItemfromCart, 
  CartCouponFullResponse,
} from '../_actions/useProducts';
import { useSales } from '../_actions/useSales';
import debounce from "@/lib/debounce";
import ImageCarousels from "@/components/ImageCarousel";
import { PhoneInput } from "@/components/ui/phone-input";
import { showToast } from "@/helper/toast";

interface CartItem {
  coupon_value: number;
  coupon_amount: number;
  id: string;
  card_variant_id: string;
  quantity: number;
  price: number;
  new_price?: number;
  coupon_id?: string;
  coupon_code?: string;
  card: {
    name: string;
    description: string;
    image_url: string;
  };
  card_variant: {
    price: number;
  };
}

interface DiscountedItem {
  card_variant_id: string;
  new_price?: number;
}

export default function Cart() {
  const router = useRouter();
  const [cartData, setCartData] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [hasCoupon, setHasCoupon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [subTotal, setSubtotal] = useState(0);

  const getBaseUnitPrice = (item: CartItem) => item.card_variant.price;

  const getActualUnitPrice = (item: CartItem) => {
    if (hasCoupon && item.coupon_id && item.new_price !== undefined) {
      return item.new_price;
    }
    return getBaseUnitPrice(item);
  };

  const calculateSubtotal = (items: CartItem[]) => 
    items.reduce((total, item) => {
      const unitPrice = getActualUnitPrice(item);
      return total + ((item.card_variant.price * item.quantity)-(item.coupon_value *item.quantity));
    }, 0);

  const debouncedUpdateCart = useCallback(
    debounce(async (id: string, newQuantity: number, currentCartData: CartItem[]) => {
      try {
        await updateCartItem({ id, quantity: newQuantity });
        
        if (hasCoupon) {
          const couponCodes = currentCartData
            .filter(item => item.coupon_code)
            .map(item => item.coupon_code!)
            .filter((code, index, self) => self.indexOf(code) === index);
        } else {
          setCartData(prev => 
            prev.map(item => 
              item.card_variant_id === id
                ? { 
                    ...item, 
                    quantity: newQuantity,
                    price: getBaseUnitPrice(item)
                  }
                : item
            )
          );
        }
      } catch (error) {
        setCartData(prev => 
          prev.map(item => 
            item.card_variant_id === id
              ? { ...item, quantity: item.quantity }
              : item
          )
        );
      }
    }, 1000),
    [hasCoupon]
  );

  const handleQuantityChange = async (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      try {
        await removeCartItemfromCart({ id });
        setCartData(prev => prev.filter(item => item.card_variant_id !== id));
        showToast("Item removed from cart", "success");
      } catch (error) {
        showToast("Failed to remove item", "error");
      }
      return;
    }
    setCartData(prev => {
      const updatedCart = prev.map(item =>
        item.card_variant_id === id
          ? { ...item, quantity: newQuantity }
          : item
      );
      debouncedUpdateCart(id, newQuantity, updatedCart);
      return updatedCart;
    });
  };

  const handlePromoCode = async () => {
    if (!promoCode.trim()) {
      showToast("Please enter a promo code", "error");
      return;
    }

    setApplyingPromo(true);
    try {
      const response = await CartCouponFullResponse({ 
        coupon_code: [promoCode],
        cart_items: cartData.map(item => ({
          card_variant_id: item.card_variant_id,
          quantity: item.quantity
        }))
      });
      
      if (response.status === 'success' && response.data?.cart_items) {
        const updatedCart = cartData.map(item => {
          const discountedItem = response.data.cart_items.find(
            (cartItem: DiscountedItem) => cartItem.card_variant_id === item.card_variant_id
          );

          return {
            ...item,
            coupon_id: response.data.coupon_id,
            coupon_code: promoCode,
            new_price: discountedItem?.new_price ?? item.price
          };
        });

        setCartData(updatedCart);
        setHasCoupon(true);
        setSubtotal(calculateSubtotal(updatedCart));
        showToast("Promo code applied successfully!", "success");
        
        const refetchCart = async () => {
          const response = await getUserCarts();
          if (response.status === 'success' && Array.isArray(response.data?.cart_items)) {
            const normalizedCartItems = response.data.cart_items.map((item: CartItem) => ({
              ...item,
              price: item.card_variant.price,
              new_price: item.new_price
            }));
            setCartData(normalizedCartItems);
          }
        };
        refetchCart();
      } else {
        showToast(response.data?.message || "Invalid promo code", "error");
      }
    } catch (error) {
      showToast("Invalid promo code", "error");
    } finally {
      setApplyingPromo(false);
    }
  };

  const handlePayment = async () => {
    if (!phoneNumber) {
      showToast("Please enter a phone number", "error");
      return;
    }
    setIsProcessingPayment(true);
    try {
      await useSales({
        phone_number: phoneNumber.replace(/^\+/, ''),
        coupon_codes: cartData
          .filter(item => item.coupon_code)
          .map(item => item.coupon_code!)
          .filter(Boolean) as string[]
      });
      showToast("Payment processed successfully!", "success");
      router.push('/');
    } catch (error) {
      showToast("Payment failed", "error");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getUserCarts();
        if (response.status === 'success' && Array.isArray(response.data?.cart_items)) {
          const normalizedCartItems = response.data.cart_items.map((item: CartItem) => ({
            ...item,
            price: item.card_variant.price,
            new_price: item.new_price
          }));
          
          setCartData(normalizedCartItems);
          setHasCoupon(normalizedCartItems.some((item: { coupon_id: any; }) => item.coupon_id));
          setSubtotal(calculateSubtotal(normalizedCartItems));
        }
      } catch (error) {
        showToast("Failed to load cart", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    setSubtotal(calculateSubtotal(cartData));
  }, [cartData]);

  if (loading) return <div className="flex justify-center items-center"><Loader2 className="animate-spin h-8 w-8" /></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-sm">
        <div className="p-4 border-b flex items-center">
          <Button variant="ghost" size="icon" className="mr-4" onClick={() => router.back()}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold px-24">Cart</h1>
        </div>

        <div className="p-4 space-y-4">
          {cartData.map((item) => (
            <div key={item.id} className="flex items-start space-x-4">
              <div className="h-24 w-20 rounded-xl shadow-lg bg-gray-100 overflow-hidden">
                <ImageCarousels images={item.card.image_url} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-bold">{item.card.name}</h3>
                    <p className="text-[13px] text-gray-400">{item.card.description}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-primary"
                    onClick={() => handleQuantityChange(item.card_variant_id, 0)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <p className={`font-bold text-primary ${hasCoupon && item.coupon_id ? 'text-[12px] line-through bg-red' : ''}`}>
                      RWF {(getBaseUnitPrice(item) * item.quantity).toLocaleString()}
                    </p>
                    {hasCoupon && item.coupon_id && item.new_price !== undefined && (
                      <p className="font-bold text-primary">
                        RWF {((getBaseUnitPrice(item) * item.quantity) - (item.coupon_value * item.quantity)).toLocaleString()}
                      </p>   
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="cartroundedminus"
                      onClick={() => handleQuantityChange(item.card_variant_id, item.quantity - 1)}
                      disabled={false}
                    >
                      <Minus />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button 
                      variant="cartroundedplus"
                      onClick={() => handleQuantityChange(item.card_variant_id, item.quantity + 1)}
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex space-x-2 w-full p-4">
            <div className="relative w-full">
              <Input
                placeholder="Promo code"
                className="p-4 border-t rounded-full bg-gray-100 pr-20"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={applyingPromo}
              />
              <Button
                variant="default"
                className="bg-primary rounded-full text-white absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-primary"
                onClick={handlePromoCode}
                disabled={applyingPromo || !promoCode.trim()}
              >
                {applyingPromo ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Apply'
                )}
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-3 border-t">
            <div className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span>
                {subTotal.toLocaleString()}
                <span className="text-gray-400 p-1.5">RWF</span>
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Delivery</span>
              <span>
                0
                <span className="text-gray-400 p-1.5">RWF</span>
              </span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>
                Total <span className="font-medium text-sm text-gray-400">({cartData.length} items)</span>
              </span>
              <span>
                {subTotal.toLocaleString()}
                <span className="text-gray-400 p-1.5">RWF</span>
              </span>
            </div>
          </div>
          <div>
          <p className="text-gray-400">Pay with</p>
          <PhoneInput 
            value={phoneNumber}
            onChange={setPhoneNumber}
            className="w-full"
          />
          </div>
          <div className="p-9 border-t items-center">
            <Button 
              className="w-64 h-14 rounded-full bg-primary hover:bg-primary text-white"
              onClick={handlePayment}
              disabled={cartData.length === 0 || isProcessingPayment}
            >
              {isProcessingPayment ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  PROCESSING...
                </>
              ) : (
                'PAY'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}