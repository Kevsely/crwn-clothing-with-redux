import { createContext, useState, useEffect } from 'react'

const addCartItem = (cartItems, productToAdd) => {
	// find if cartItems contains productToAdd
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	)

	// If found, increment quantity
	if (existingCartItem) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		)
	}

	// return new array with modified cartItems/new cart item
	return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
	const finalCart = []
	for (const cartItem of cartItems) {
		cartItem.id === productToRemove.id && cartItem.quantity > 1
			? finalCart.push({ ...cartItem, quantity: cartItem.quantity - 1 })
			: finalCart.push(cartItem)
	}
	return finalCart
}

const removeAllUnits = (cartItems, productToRemove) => {
	return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id)
}

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0,
})

const updateCartItemsReducer = (newCartItems) => {
	const newCartCount = newCartItems.reduce(
		(total, cartItem) => total + cartItem.quantity,
		0
	)

	const newCartTotal = newCartItems.reduce(
		(total, cartItem) => total + cartItem.quantity * cartItem.price,
		0
	)
}


export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false)
	const [cartItems, setCartItems] = useState([])
	const [cartCount, setCartCount] = useState(0)
	const [cartTotal, setCartTotal] = useState(0)

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		)
		setCartCount(newCartCount)
	}, [cartItems])

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		)
		setCartTotal(newCartTotal)
	}, [cartItems])

	const addItemToCart = (productToAdd) => {
		const newCartItems = addCartItem(cartItems, productToAdd)
		updateCartItemsReducer(newCartItems)
	}

	const removeItemFromCart = (productToRemove) => {
		const newCartItems = removeCartItem(cartItems, productToRemove)
		updateCartItemsReducer(newCartItems)
	}

	const clearItemFromCart = (productToRemove) => {
		const newCartItems = removeAllUnits(cartItems, productToRemove)
		updateCartItemsReducer(newCartItems)
	}

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartItems,
		cartCount,
		cartTotal,
	}

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
